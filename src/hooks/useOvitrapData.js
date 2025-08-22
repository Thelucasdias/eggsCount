import { useState, useEffect } from "react";

export default function useOvitrapData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const params = new URLSearchParams({
          key: apiKey,
          page: "1",
        });
        const response = await fetch(
          "https://contaovos.com/pt-br/api/lastcounting?{params.toString()}"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const resData = await response.json();
        setData(resData);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
