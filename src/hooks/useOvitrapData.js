import { useState, useEffect } from "react";

export default function useOvitrapData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://contaovos.com/pt-br/api/lastcountingpublic?municipality=Corinto"
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
