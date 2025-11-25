import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
    try {
        await dbConnect();
        // Sort by sequence ascending, then by name
        const categories = await Category.find({}).sort({ sequence: 1, name: 1 });
        return NextResponse.json({ success: true, data: categories }, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400, headers: corsHeaders });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const category = await Category.create(body);
        return NextResponse.json({ success: true, data: category }, { status: 201, headers: corsHeaders });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400, headers: corsHeaders });
    }
}
