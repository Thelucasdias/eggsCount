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

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-950">
          EggsCount - Análise de Armadilhas
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
            Dados das Armadilhas
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
                    <th className="p-3 text-left">Ovitrap ID</th>
                    <th className="p-3 text-left">Ovos</th>
                    <th className="p-3 text-left">Semana</th>
                    <th className="p-3 text-left">Data</th>
                    <th className="p-3 text-left">Coleta</th>
                    <th className="p-3 text-left min-w-[180px]">Coordenadas</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((trap) => (
                    <tr
                      key={trap.counting_id}
                      className="border-t border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                      <td className="p-3">{trap.ovitrap_id}</td>
                      <td className="p-3">{trap.eggs}</td>
                      <td className="p-3">{trap.week}</td>
                      <td className="p-3">{formatDate(trap.date)}</td>
                      <td className="p-3">{formatDate(trap.date_collect)}</td>
                      <td className="p-3">
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
        </aside>
      </main>
    </div>
  );
}
