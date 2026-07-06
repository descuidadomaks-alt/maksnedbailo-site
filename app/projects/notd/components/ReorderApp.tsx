"use client";

import { useMemo, useRef, useState } from "react";
import { detectRole } from "../lib/columns";
import { DEFAULT_CONFIG } from "../lib/config";
import { buildDemoData } from "../lib/demoData";
import { buildForecast } from "../lib/forecast";
import { normalizeOrderRows, normalizeProductRows } from "../lib/normalize";
import { parseWorkbookFile } from "../lib/parseWorkbook";
import { filterAndJoin } from "../lib/pipeline";
import { applySurvey, submitSurvey, summarizeSurvey } from "../lib/survey";
import type {
  ForecastConfig,
  ForecastResult,
  LoadedSource,
  OrderRow,
  ProductRow,
  RawTable,
  SurveyAnswers,
} from "../lib/types";

import { Header } from "./Header";
import { UploadZone } from "./UploadZone";
import { SourceChip } from "./SourceChip";
import { GoogleSheetsInput } from "./GoogleSheetsInput";
import { SettingsPanel } from "./SettingsPanel";
import { SummaryCards } from "./SummaryCards";
import { InsightsPanel } from "./InsightsPanel";
import { ReportTable } from "./ReportTable";
import { SurveyModal } from "./SurveyModal";
import { OnboardingSteps } from "./OnboardingSteps";
import { Footer } from "./Footer";

/**
 * Single point of convergence for both input paths (file upload and Google
 * Sheets URL): both produce a RawTable and hand it to handleRawTable, which
 * does role detection -> normalization -> state update. There is exactly one
 * pipeline implementation downstream of this, regardless of input origin.
 */
export function ReorderApp() {
  const [sources, setSources] = useState<LoadedSource[]>([]);
  const [ordersRows, setOrdersRows] = useState<OrderRow[] | null>(null);
  const [productsRows, setProductsRows] = useState<ProductRow[] | null>(null);
  const [config, setConfig] = useState<ForecastConfig>(DEFAULT_CONFIG);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers | undefined>(undefined);
  const [surveyNote, setSurveyNote] = useState<string | null>(null);
  const nextId = useRef(0);

  function handleSurveySubmit(answers: SurveyAnswers) {
    setSurveyAnswers(answers);
    setConfig((c) => applySurvey(c, answers));
    setSurveyNote(summarizeSurvey(answers));
    setSurveyOpen(false);
    // Deliver answers off-device (best-effort) so the owner can review them.
    void submitSurvey(answers);
  }

  function addSource(source: Omit<LoadedSource, "id">) {
    nextId.current += 1;
    setSources((prev) => [...prev, { ...source, id: String(nextId.current) }]);
  }

  function handleRawTable(raw: RawTable, label: string) {
    const role = detectRole(raw.headers);

    if (role === "unknown") {
      addSource({ label, role, rowCount: 0, error: "не схоже на експорт KeyCRM" });
      return;
    }
    if (role === "orders" && ordersRows) {
      addSource({ label, role, rowCount: 0, error: "файл замовлень вже завантажено" });
      return;
    }
    if (role === "products" && productsRows) {
      addSource({ label, role, rowCount: 0, error: "файл товарів вже завантажено" });
      return;
    }

    try {
      if (role === "orders") {
        const rows = normalizeOrderRows(raw);
        setOrdersRows(rows);
        addSource({ label, role, rowCount: rows.length });
      } else {
        const rows = normalizeProductRows(raw);
        setProductsRows(rows);
        addSource({ label, role, rowCount: rows.length });
      }
    } catch (e) {
      addSource({ label, role, rowCount: 0, error: e instanceof Error ? e.message : "помилка обробки" });
    }
  }

  async function handleFilesSelected(files: File[]) {
    for (const file of files) {
      try {
        const raw = await parseWorkbookFile(file);
        handleRawTable(raw, file.name);
      } catch (e) {
        addSource({
          label: file.name,
          role: "unknown",
          rowCount: 0,
          error: e instanceof Error ? e.message : "не вдалося прочитати файл",
        });
      }
    }
  }

  function loadDemoData() {
    // Replaces any loaded sources wholesale — demo is a clean-slate showcase.
    const { orders, products } = buildDemoData(new Date());
    setOrdersRows(orders);
    setProductsRows(products);
    nextId.current += 2;
    setSources([
      { id: `${nextId.current - 1}`, label: "Демо", role: "orders", rowCount: orders.length },
      { id: `${nextId.current}`, label: "Демо", role: "products", rowCount: products.length },
    ]);
  }

  function removeSource(id: string) {
    const source = sources.find((s) => s.id === id);
    setSources((prev) => prev.filter((s) => s.id !== id));
    if (source?.role === "orders" && !source.error) setOrdersRows(null);
    if (source?.role === "products" && !source.error) setProductsRows(null);
  }

  const computed = useMemo((): { result?: ForecastResult; error?: string } => {
    if (!ordersRows || !productsRows) return {};
    try {
      const join = filterAndJoin(ordersRows, productsRows, config);
      const result = buildForecast(join.filtered, productsRows, join, config);
      return { result };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Не вдалося побудувати прогноз." };
    }
  }, [ordersRows, productsRows, config]);

  const hasAnySource = sources.length > 0;

  return (
    <main>
      <Header />

      <div id="tool" className="mx-auto mt-14 max-w-3xl scroll-mt-10 px-5">
        <p className="reorder-display mb-4 text-2xl text-[var(--reorder-fg)] sm:text-3xl">
          01 · Дані
        </p>
        <UploadZone onFilesSelected={handleFilesSelected} />
      </div>

      <GoogleSheetsInput onRawTable={handleRawTable} />

      <div className="mx-auto mt-5 max-w-3xl px-5 text-center">
        <button
          type="button"
          onClick={loadDemoData}
          className="border-b border-[var(--reorder-accent-deep)] pb-0.5 text-xs uppercase tracking-[0.18em] text-[var(--reorder-accent-deep)] transition-colors hover:text-[var(--reorder-fg)]"
        >
          Спробувати на демо-даних (90 днів)
        </button>
        <p className="mt-1.5 text-[10px] text-[var(--reorder-fg-muted)]">
          Згенерований показовий набір — не реальні дані магазину.
        </p>
      </div>

      {sources.length > 0 && (
        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2 px-5">
          {sources.map((s) => (
            <SourceChip key={s.id} source={s} onRemove={() => removeSource(s.id)} />
          ))}
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <SettingsPanel config={config} onChange={setConfig} />
      </div>

      {!hasAnySource && <OnboardingSteps />}

      {computed.error && (
        <p className="mx-auto mt-8 max-w-2xl px-5 text-center text-sm text-red-600">{computed.error}</p>
      )}

      {computed.result && (
        <>
          <div className="mx-auto mt-14 max-w-5xl px-5">
            <p className="reorder-display text-2xl text-[var(--reorder-fg)] sm:text-3xl">
              02 · План дозамовлення
            </p>
          </div>
          <SummaryCards result={computed.result} />
          <InsightsPanel result={computed.result} config={config} />

          {/* Improve-accuracy CTA */}
          <div className="mx-auto mt-8 max-w-5xl px-5">
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--reorder-ink)] bg-[var(--reorder-ink)] p-6 text-white sm:flex-row sm:items-center">
              <div>
                <p className="reorder-display text-xl sm:text-2xl">Точніший прогноз за 1 хвилину</p>
                <p className="mt-1 max-w-md text-sm text-white/70">
                  {surveyNote ??
                    "Розкажіть про терміни постачання, сезон і рівень запасу — система врахує це у розрахунках."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSurveyOpen(true)}
                className="shrink-0 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--reorder-ink)] transition-transform hover:-translate-y-0.5"
              >
                {surveyAnswers ? "Змінити відповіді" : "Пройти опитування"}
              </button>
            </div>
          </div>

          <ReportTable rows={computed.result.rows} windowDays={computed.result.windowDays} config={config} />
        </>
      )}

      <Footer />

      {surveyOpen && (
        <SurveyModal
          initial={surveyAnswers}
          onClose={() => setSurveyOpen(false)}
          onSubmit={handleSurveySubmit}
        />
      )}
    </main>
  );
}
