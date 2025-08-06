import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://contaovos.com/pt-br/api/lastcountingpublic?municipality=Corinto"
    )
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setLoading(false);
      });
  }, []);

  const currentWeek = data.length > 0 ? data[0].week : null;

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Filtrar e ordenar armadilhas positivas
  const positiveTraps = data
    .filter((trap) => trap.eggs > 0)
    .sort((a, b) => b.eggs - a.eggs);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-950">
          EggsCount
        </h1>
        <p className="text-gray-600 mt-2">
          Monitoramento e análise de dados de ovitrampas
        </p>
      </header>

      {/* Main Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Table Section */}
        <section className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
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
                    <th className="p-3 text-center">Ovitrap ID</th>
                    <th className="p-3 pl-6 text-center">Ovos</th>
                    <th className="p-3 text-center">Data</th>
                    <th className="p-3 text-center">Coleta</th>
                    <th className="pr-4 text-center min-w-[180px]">
                      Coordenadas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((trap) => (
                    <tr
                      key={trap.counting_id}
                      className="border-t border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                      <td className="p-4 pl-6">{trap.ovitrap_id}</td>
                      <td className="p-4 pl-14">{trap.eggs}</td>
                      <td className="p-4 pl-14">{formatDate(trap.date)}</td>
                      <td className="p-4 pl-14">
                        {formatDate(trap.date_collect)}
                      </td>
                      <td className="p-4 pl-14">
                        <span className="block">
                          {trap.latitude.toFixed(6)}
                        </span>
                        <span className="block">
                          {trap.longitude.toFixed(6)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Analytics Sidebar */}
        <aside className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-indigo-900 mb-3">
              Resumo Estatístico
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-indigo-50 p-3 rounded">
                <p className="text-sm text-indigo-600">Total de Ovos</p>
                <p className="text-xl font-bold">
                  {data.reduce((sum, trap) => sum + trap.eggs, 0)}
                </p>
              </div>
              <div className="bg-indigo-50 p-3 rounded">
                <p className="text-sm text-indigo-600">Armadilhas Ativas</p>
                <p className="text-xl font-bold">
                  {new Set(data.map((trap) => trap.ovitrap_id)).size}
                </p>
              </div>
            </div>
          </div>

          {/* Placeholder for Charts */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-indigo-900 mb-3">
              Gráfico Semanal
            </h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Gráfico será exibido aqui</p>
            </div>
          </div>

          {/* Positive Traps List */}
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
                {loading
                  ? "Carregando..."
                  : "Nenhuma armadilha positiva encontrada"}
              </p>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
