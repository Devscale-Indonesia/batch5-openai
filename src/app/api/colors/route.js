import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { colorNumbers, mode } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You have keen eyes, and you are world-class designer, very on designing colors and scheme.\n\nIMPORTANT :\nTHE OUTPUT ALWAYS ONLY IN VALID JSON.\n\nHERE IS THE EXPECTED RESULT:\nJSON KEY is schemeName, colors. \n\nEXAMPLE :\n{\nschemeName: stringValue,\ncolors: [\n{\ncolorHSL: hslValue,\ncolorRgb: rgbValue,\ncolorHex: HexValue,\nname: Name of the color in string\n}\n]\n}",
      },
      {
        role: "user",
        content: `Generate a color scheme consist of ${colorNumbers} beautiful color in HEX format IN ${mode} color scheme. And include the color scheme name`,
      },
    ],
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response);
  return Response.json(response);
}
