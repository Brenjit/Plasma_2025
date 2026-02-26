import { google } from "googleapis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/gallery/image?id={fileId}
 * Proxies a Google Drive image through the server using service account auth.
 * This avoids needing files to be publicly shared.
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const fileId = searchParams.get("id");

        if (!fileId) {
            return NextResponse.json({ error: "Missing file id" }, { status: 400 });
        }

        // Auth: API Key (public files) or Service Account (private files)
        let auth: any;
        if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
            auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                },
                scopes: ["https://www.googleapis.com/auth/drive.readonly"],
            });
        } else if (process.env.GOOGLE_API_KEY) {
            auth = process.env.GOOGLE_API_KEY;
        } else {
            return NextResponse.json({ error: "No credentials configured" }, { status: 500 });
        }

        const drive = google.drive({ version: "v3", auth });

        // Stream the file content from Drive
        const res = await drive.files.get(
            { fileId, alt: "media" },
            { responseType: "stream" }
        );

        const contentType = (res.headers as any)["content-type"] || "image/jpeg";

        // Convert Node.js Readable stream into a Web ReadableStream
        // This streams the file directly to the browser chunk-by-chunk
        // instead of buffering the entire image in memory (which crashes Vercel serverless functions).
        const webStream = new ReadableStream({
            start(controller) {
                (res.data as NodeJS.ReadableStream).on("data", (chunk: Buffer) => {
                    controller.enqueue(chunk);
                });
                (res.data as NodeJS.ReadableStream).on("end", () => {
                    controller.close();
                });
                (res.data as NodeJS.ReadableStream).on("error", (err) => {
                    controller.error(err);
                });
            }
        });

        return new Response(webStream, {
            headers: {
                "Content-Type": contentType,
                // Cache for 7 days in browser, cache for 1 year in Vercel Edge Cache
                "Cache-Control": "public, max-age=604800, s-maxage=31536000, stale-while-revalidate=86400, immutable",
            },
        });

    } catch (error: any) {
        console.error("Image proxy error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
