import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const sliderDir = path.join(process.cwd(), 'public', 'home_slider');

        if (!fs.existsSync(sliderDir)) {
            return NextResponse.json({ images: [] });
        }

        const files = fs.readdirSync(sliderDir)
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .sort((a, b) => {
                const numA = parseInt(a.match(/^(\d+)/)?.[1] ?? '0', 10);
                const numB = parseInt(b.match(/^(\d+)/)?.[1] ?? '0', 10);
                return numA - numB;
            })
            .map(file => `/home_slider/${file}`);

        return NextResponse.json({ images: files });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
    }
}
