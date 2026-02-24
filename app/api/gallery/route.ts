import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "gallery.json");

export async function GET() {
    try {
        const fileContents = fs.readFileSync(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error reading gallery data:", error);
        return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newData = await request.json();

        // Basic validation
        if (!newData || !newData.events) {
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
        }

        fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 4), "utf8");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error writing gallery data:", error);
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
}
