"use client";

import { useState } from "react";

export const RecipeGenerator = () => {
  const [result, setResult] = useState(null);

  async function handleGenerateRecipe(formData) {
    const ingredients = formData.get("ingredients");
    const style = formData.get("style");

    const res = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify({ ingredients, style }),
    });
    const data = await res.json();
    const parsedData = JSON.parse(data.choices[0].message.content);
    console.log(parsedData);
    setResult(parsedData);
  }

  return (
    <main className="max-w-md m-auto my-12 space-y-6">
      <div>
        <h2 className="text-xl font-bold">Generate Dish AI</h2>
        <p className="text-sm text-slate-500">Let's ai generate dish from ingredients you had in your fridge</p>
      </div>
      <form action={handleGenerateRecipe} className="space-y-2">
        <textarea name="ingredients" placeholder="Ingredients" className="block border p-3 w-full"></textarea>
        <select name="style" className=" block border p-3 w-full">
          <option>Mediterranian</option>
          <option>Asian</option>
          <option>Italian</option>
          <option>American</option>
        </select>
        <button className="block bg-indigo-500 text-white font-medium px-3 py-2 w-full">Generate my dish!</button>
      </form>
      {result && result.isEdible === true ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{result.dishName}</h2>
          <p>Kalori : {result.dishCalories}</p>
          <div>
            <h4 className="text-lg font-bold">Bahan yang kamu punya</h4>
            <div>
              {result.userIngredients.map((bahan) => {
                return <div key={bahan}>{bahan}</div>;
              })}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">Bahan Tambahan</h4>
            <div>
              {result.additionalIngredients.map((bahan) => {
                return <div key={bahan}>{bahan}</div>;
              })}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">Cara memasak :</h4>
            <div>
              {result.steps.map((step) => {
                return <div key={step}>{step}</div>;
              })}
            </div>
          </div>
        </div>
      ) : null}

      {result.isEdible === false ? <div>Bahan kamu masukan tidak bisa di masak</div> : null}
    </main>
  );
};
