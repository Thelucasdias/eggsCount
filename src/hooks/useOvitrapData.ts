import { useState, useEffect } from "react";
import { OvitrapData } from "../types/ovitrap";

interface UseOvitrapDataReturn {
  data: OvitrapData[];
  loading: boolean;
  error: Error | null;
}

export default function useOvitrapData(): UseOvitrapDataReturn {
  const [data, setData] = useState<OvitrapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const params = new URLSearchParams({
          key: apiKey,
          page: "1",
        });

        const response = await fetch(
          `https://contaovos.com/pt-br/api/lastcounting?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const resData: OvitrapData[] = await response.json();
        setData(resData);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
