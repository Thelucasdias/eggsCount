import { OvitrapData } from "../types/ovitrap";

interface WeeklyChartProps {
  data: OvitrapData[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold text-indigo-900 mb-3">Gráfico Semanal</h3>
      <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
        <p className="text-gray-500">
          {data.length > 0 ? "Gráfico será exibido aqui" : "Sem dados"}
        </p>
      </div>
    </div>
  );
}
