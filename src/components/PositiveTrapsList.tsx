import { OvitrapData } from "../types/ovitrap";
import { formatDate } from "../utils/formatDate";

interface PositiveTrapsListProps {
  data: OvitrapData[];
  loading: boolean;
}

export default function PositiveTrapsList({
  data,
  loading,
}: PositiveTrapsListProps) {
  const positiveTraps = data
    .filter((trap) => trap.eggs > 0)
    .sort((a, b) => b.eggs - a.eggs);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold text-indigo-900 mb-3">
        Armadilhas Positivas
      </h3>
      {positiveTraps.length > 0 ? (
        <div className="space-y-3">
          {positiveTraps.map((trap) => (
            <div
              key={trap.counting_id}
              className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-indigo-800">
                  {trap.ovitrap_id}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                  {`${trap.eggs} ovo${trap.eggs !== 1 ? "s" : ""}`}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {formatDate(trap.date_collect)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {trap.latitude.toFixed(4)} {trap.longitude.toFixed(4)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          {loading ? "Carregando..." : "Nenhuma armadilha positiva encontrada"}
        </p>
      )}
    </div>
  );
}
