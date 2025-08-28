import "./index.css";
import useOvitrapDataPublic from "./hooks/useOvitrapDataPublic";
import Header from "./components/Header";
import DataTable from "./components/DataTable";
import SummaryCard from "./components/SummaryCard";
import WeeklyChart from "./components/WeeklyChart";
import PositiveTrapsList from "./components/PositiveTrapsList";
import { calculatePositivityRate } from "./utils/calculations";

export default function App() {
  const { data, loading, error } = useOvitrapDataPublic();
  const currentWeek = data.length > 0 ? data[0].week : null;
  const positivityRate = calculatePositivityRate(data);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Header />

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <DataTable data={data} loading={loading} currentWeek={currentWeek} />
        </section>

        <aside className="space-y-6">
          <SummaryCard data={data} />
          <WeeklyChart data={data} />
          <PositiveTrapsList data={data} loading={loading} />
        </aside>
        <p className="text-sm text-gray-600 mt-1">
          Taxa de positividade: {positivityRate.toFixed(1)}%
        </p>
      </main>
    </div>
  );
}
