import { google } from "googleapis";
import { NextResponse } from "next/server";

// Authenticate
const getDrive = () => {
    // 1. Try API Key (Simplest for Public Folders)
    if (process.env.GOOGLE_API_KEY) {
        return google.drive({
            version: "v3",
            auth: process.env.GOOGLE_API_KEY
        });
    }

    // 2. Try Service Account (For Private Folders)
    try {
        if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
            const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                },
                scopes: SCOPES,
            });
            return google.drive({ version: "v3", auth: auth as any });
        }
    } catch (error) {
        console.error("Service Account Auth Error:", error);
    }

    return null;
};

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { folderId } = await request.json();

        if (!folderId) {
            return NextResponse.json({ error: "Folder ID is required" }, { status: 400 });
        }

        const drive = getDrive();
        if (!drive) {
            return NextResponse.json({
                error: "Missing Google Credentials. Please add GOOGLE_API_KEY (easiest) or Service Account details to .env.local"
            }, { status: 500 });
        }

        // List files in the folder
        const response = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: "files(id, name, webContentLink, thumbnailLink)",
            pageSize: 100,
        });

        const files = response.data.files;

        if (!files || files.length === 0) {
            return NextResponse.json({ images: [] });
        }

        // Transform to GalleryImage format
        // use 'thumbnailLink' for the grid (fast, avoids 403s), and 'drive.google.com/uc' for the full view
        const images = files.map(file => {
            // thumbnailLink usually comes as small size (e.g. =s220). 
            // We can replace it with =w600-h400 to get a decent preview size.
            let previewUrl = file.thumbnailLink;
            if (previewUrl && previewUrl.includes("=s")) {
                previewUrl = previewUrl.replace(/=s\d+/, "=w600-h400"); // Request larger thumbnail
            }

            return {
                id: file.id!,
                url: `https://drive.google.com/uc?export=view&id=${file.id}`,
                previewUrl: previewUrl || null, // Add previewUrl
                tags: []
            };
        });

        return NextResponse.json({ images });

    } catch (error: any) {
        console.error("Drive Sync Error:", error);
        return NextResponse.json({ error: error.message || "Failed to sync with Drive" }, { status: 500 });
    }
}
