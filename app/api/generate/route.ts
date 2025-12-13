import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const id = `gen_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const generation = {
      id,
      prompt: prompt.trim(),
      status: "pending" as const,
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      generation,
    });
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json(
      { error: "Failed to process generation request" },
      { status: 500 }
    );
  }
}
