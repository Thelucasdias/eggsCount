import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const apiKey = process.env.API_KEY;
    const page = req.query.page || "1";

    const response = await fetch(
      `https://contaovos.com/pt-br/api/lastcounting?key=${apiKey}&page=${page}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro na API externa" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro no backend:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
