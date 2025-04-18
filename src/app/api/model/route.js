import { NextResponse } from "next/server";
export async function POST(req) {
  const { text } = await req.json();

  const HF_TOKEN = process.env.HUGGING_FACE_TOKEN ;
  const MODEL_ID = "Satyamk1345/ShlokVaani";
    console.log("hello world") ; 
  const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_ID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        inputs: text,
        parameters: {
          src_lang: "hi",  // source language is Hindi
          tgt_lang: "en"   // target language is English
        }
      })
    });

  const result = await response.json();
    console.log("Result explanation text is , " ,   result) ;
  if (result.error) {
    console.error("Error from Hugging Face API:", result.error);
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ translation: result[0]?.translation_text || "No output" });
}
