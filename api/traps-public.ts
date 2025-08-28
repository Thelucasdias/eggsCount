import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const municipality = (req.query.municipality as string) || "Corinto";

    const response = await fetch(
      `https://contaovos.com/pt-br/api/lastcountingpublic?municipality=${municipality}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro na API externa" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro no backend público:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
