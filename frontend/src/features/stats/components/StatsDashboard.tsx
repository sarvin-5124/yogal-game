import { useEffect, useState } from "react";
import { statsApi } from "../api/stats.api";
import type { StatsResponse } from "../types/stats.types";

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-stone-100">
      <p className="text-xs uppercase tracking-wide text-stone-400">{label}</p>
      <p className="mt-1 font-serif text-2xl font-semibold text-stone-800">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-stone-400">{hint}</p>}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="font-serif text-sm font-semibold uppercase tracking-wide text-stone-500">
        {title}
      </h2>
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-100">
        {children}
      </div>
    </section>
  );
}

export function StatsDashboard() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await statsApi.get();
      setData(res);
    } catch (err) {
      setError((err as Error).message ?? "Failed to load stats.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <h1 className="font-serif text-xl font-semibold text-stone-800">
            🧘 Yogal — Stats
          </h1>
          <button
            onClick={load}
            disabled={loading}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
        {loading && !data && (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {data && (
          <>
            <p className="text-xs text-stone-400">
              Generated {formatDateTime(data.generatedAt)}
            </p>

            <Section title="Total signups">
              <StatCard label="Signups" value={data.totalSignups} />
            </Section>

            <Section title="Signups by trigger">
              <ul className="divide-y divide-stone-100 text-sm">
                {Object.entries(data.signupsByTrigger).map(([k, v]) => (
                  <li
                    key={k}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="font-mono text-xs text-stone-600">
                      {k}
                    </span>
                    <span className="font-semibold text-stone-800">{v}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Top poses by signup">
              {data.topPosesBySignup.length === 0 ? (
                <p className="text-sm text-stone-400">No signups yet.</p>
              ) : (
                <ul className="divide-y divide-stone-100 text-sm">
                  {data.topPosesBySignup.map((p) => (
                    <li
                      key={p.poseId}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-stone-700">{p.name}</span>
                      <span className="font-semibold text-stone-800">
                        {p.signups}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title={`Recent signups (${data.recentSignups.length})`}>
              {data.recentSignups.length === 0 ? (
                <p className="text-sm text-stone-400">No signups yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs uppercase tracking-wide text-stone-400">
                      <tr>
                        <th className="py-2 pr-3">Name</th>
                        <th className="py-2 pr-3">Phone</th>
                        <th className="py-2 pr-3">Pose</th>
                        <th className="py-2 pr-3">Clues</th>
                        <th className="py-2 pr-3">Trigger</th>
                        <th className="py-2">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {data.recentSignups.map((s) => (
                        <tr key={s.id} className="text-stone-700">
                          <td className="py-2 pr-3">{s.name ?? "—"}</td>
                          <td className="py-2 pr-3 font-mono text-xs">
                            {s.phone ?? s.email ?? "—"}
                          </td>
                          <td className="py-2 pr-3">#{s.poseId}</td>
                          <td className="py-2 pr-3">{s.cluesUsed}</td>
                          <td className="py-2 pr-3 font-mono text-xs">
                            {s.trigger}
                          </td>
                          <td className="py-2 text-xs text-stone-400">
                            {formatDateTime(s.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>

            <details className="text-xs text-stone-400">
              <summary className="cursor-pointer">Raw JSON</summary>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-stone-100 p-3 text-stone-700">
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          </>
        )}
      </main>
    </div>
  );
}
