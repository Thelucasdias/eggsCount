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
        const response = await fetch("/api/traps?page=1");

        if (!response.ok) {
          throw new Error("Falha ao buscar dados da API interna");
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
