import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { ingredients, style } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are expert in cooking, always able to create recipe from the only ingredients user had. \n\nIMPORTANT :\nTHE OUTPUT SHOULD BE ONLY VALID JSON WITH FOLLOWING SHAPE\n\n{\ndishName: stringValue,\ndishCalories: stringValue,\nuserIngredients: stringArray,\nadditionalIngredients: stringArray,\nsteps: stringArray\n}\n\nIMPORTANT: \nTHE OUTPUT SHOULD BE IN BAHASA INDONESIA",
      },
      {
        role: "user",
        content: `Generate a recipe in ${style} style cuisine, with following ingredients: ${ingredients}`,
      },
    ],
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return Response.json(response);
}
