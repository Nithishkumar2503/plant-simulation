export async function runSimulation(input: any) {
  const res = await fetch("http://localhost:5000/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to run simulation");
  }

  return data;
}