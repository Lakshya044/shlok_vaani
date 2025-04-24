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
  console.log("Result from Hugging Face API:", result);
  console.log("Result explanation text is , " ,   result) ;
  if (result.error) {

    // Fallback to Gemini Pro API
    console.log("Hugging Face API error, falling back to Gemini Pro");
    try {
      const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
      if (!GOOGLE_API_KEY) {
        console.error('API_KEY is not defined in environment variables');
        throw new Error('API_KEY is not defined');
      }
      
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `Translate the following Sanskrit text to English: "${text}"`;
      console.log('Formatted input for Gemini:', prompt);
      
      const result = await model.generateContent(prompt);
      
      if (result && result.response) {
        const responseText = await result.response.text();
        console.log('Gemini response text:', responseText);
        geminiResult.candidates = [{ content: { parts: [{ text: responseText }] } }];
      }
      
      const geminiResult = await geminiResponse.json();
      console.log("Result from Gemini Pro API:", geminiResult);
      
      if (geminiResult.candidates && geminiResult.candidates[0]?.content?.parts?.[0]?.text) {
        return NextResponse.json({ 
          translation: geminiResult.candidates[0].content.parts[0].text,
        });
      }
    } catch (geminiError) {
      console.error("Error with Gemini Pro fallback:", geminiError);
    }

    // console.error("Error from Hugging Face API:", result.error);
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ translation: result[0]?.translation_text || "No output" });
}
