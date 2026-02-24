import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const sliderDir = path.join(process.cwd(), 'public', 'Media', 'main_page_slider');

        if (!fs.existsSync(sliderDir)) {
            return NextResponse.json({ images: [] });
        }

        const files = fs.readdirSync(sliderDir);
        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/Media/main_page_slider/${file}`);

        return NextResponse.json({ images });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
    }
}
