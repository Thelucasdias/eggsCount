import { OvitrapData } from "../types/ovitrap";
import { formatDate } from "../utils/formatDate";

interface DataTableProps {
  data: OvitrapData[];
  loading: boolean;
  currentWeek: number | null;
}

export default function DataTable({
  data,
  loading,
  currentWeek,
}: DataTableProps) {
  return (
    <>
      <h2 className="text-xl text-center font-semibold text-indigo-900 mb-4">
        Dados das Armadilhas{currentWeek && ` - Semana ${currentWeek}`}
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Carregando dados...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="p-3 pl-8">Ovitrap ID</th>
                <th className="p-3 pl-8">Ovos</th>
                <th className="p-3 pl-8">Data</th>
                <th className="p-3 pl-8">Coleta</th>
                <th className="pr-6 min-w-[180px]">Coordenadas</th>
              </tr>
            </thead>
            <tbody>
              {data.map((trap) => (
                <tr
                  key={trap.counting_id}
                  className="border-t border-gray-200 hover:bg-blue-50 transition-colors"
                >
                  <td className="p-4 pl-10">{trap.ovitrap_id}</td>
                  <td className="p-4 pl-16">{trap.eggs}</td>
                  <td className="p-4 pl-16">{formatDate(trap.date)}</td>
                  <td className="p-4 pl-16">{formatDate(trap.date_collect)}</td>
                  <td className="p-4 pl-16">
                    <span className="block">{trap.latitude.toFixed(6)}</span>
                    <span className="block">{trap.longitude.toFixed(6)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
