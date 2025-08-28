import { useState, useEffect } from "react";
import { OvitrapData, UseOvitrapDataReturn } from "../types/ovitrap";

export default function useOvitrapDataPublic(): UseOvitrapDataReturn {
  const [data, setData] = useState<OvitrapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/traps-public?municipality=Corinto`);

        if (!response.ok) {
          throw new Error("Falha ao buscar dados da API pública");
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
