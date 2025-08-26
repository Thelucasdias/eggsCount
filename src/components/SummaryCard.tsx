import { OvitrapData } from "../types/ovitrap";
import { calculatePositivityRate } from "../utils/calculations";

interface SummaryCardProps {
  data: OvitrapData[];
}

export default function SummaryCard({ data }: SummaryCardProps) {
  const totalEggs = data.reduce((sum, trap) => sum + trap.eggs, 0);
  const activeTraps = new Set(data.map((trap) => trap.ovitrap_id)).size;
  const positivityRate = calculatePositivityRate(data).toFixed(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold text-indigo-900 mb-3">Resumo Estatístico</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-indigo-50 p-3 rounded">
          <p className="text-sm text-indigo-600">Total de Ovos</p>
          <p className="text-xl font-bold">{totalEggs}</p>
        </div>
        <div className="bg-indigo-50 p-3 rounded">
          <p className="text-sm text-indigo-600">Armadilhas Ativas</p>
          <p className="text-xl font-bold">{activeTraps}</p>
        </div>
        <div className="bg-indigo-50 p-3 rounded col-span-2">
          <p className="text-sm text-indigo-600">Taxa de Positividade</p>
          <p className="text-xl font-bold">{positivityRate}%</p>
        </div>
      </div>
    </div>
  );
}
