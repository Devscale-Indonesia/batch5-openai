"use client";

import { useState } from "react";

export const ColorGenerator = () => {
  const [result, setResult] = useState(null);

  async function handleGenerateColor(formData) {
    const colorNumbers = formData.get("colorNumbers");
    const mode = formData.get("mode");

    const res = await fetch("/api/colors", {
      method: "POST",
      body: JSON.stringify({ colorNumbers, mode }),
    });
    const data = await res.json();
    const parsedData = JSON.parse(data.choices[0].message.content);
    setResult(parsedData);
  }

  return (
    <div>
      <h1>Color Generator</h1>
      <form action={handleGenerateColor}>
        <input name="colorNumbers" type="number" min={1} max={10} />
        <select name="mode">
          <option>Light</option>
          <option>Dark</option>
        </select>
        <button>Generate!</button>
      </form>
      <section>
        <h2> Color Scheme Name : {result?.schemeName}</h2>
        <div>
          {result?.colors.map((color) => {
            return (
              <div style={{ width: "200px", height: "200px", backgroundColor: color.colorHex }} className="flex justify-center items-center">
                {color.name}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
