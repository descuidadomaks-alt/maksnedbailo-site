// Fetches a public ("anyone with the link can view") Google Sheet as CSV,
// entirely client-side, via the gviz CSV export endpoint (CORS-enabled).

const ID_PATTERN = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
const GID_PATTERN = /[#&?]gid=(\d+)/;

export function buildGvizUrl(sheetUrl: string): string | null {
  const trimmed = sheetUrl.trim();
  if (!trimmed) return null;

  const idMatch = trimmed.match(ID_PATTERN);
  // Allow pasting just the raw spreadsheet ID too.
  const id = idMatch ? idMatch[1] : /^[a-zA-Z0-9-_]{20,}$/.test(trimmed) ? trimmed : null;
  if (!id) return null;

  const gidMatch = trimmed.match(GID_PATTERN);
  const gid = gidMatch ? gidMatch[1] : "0";

  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&gid=${gid}`;
}

export class GoogleSheetFetchError extends Error {}

export async function fetchSheetCsv(sheetUrl: string): Promise<string> {
  const gvizUrl = buildGvizUrl(sheetUrl);
  if (!gvizUrl) {
    throw new GoogleSheetFetchError("Не вдалося розпізнати посилання на Google Таблицю.");
  }

  let response: Response;
  try {
    response = await fetch(gvizUrl);
  } catch {
    throw new GoogleSheetFetchError(
      "Не вдалося завантажити таблицю. Перевірте з'єднання та посилання.",
    );
  }

  if (!response.ok) {
    throw new GoogleSheetFetchError(
      "Таблиця недоступна. Переконайтеся, що доступ відкрито «для всіх, хто має посилання».",
    );
  }

  const text = await response.text();
  // Google serves an HTML sign-in/error page (not CSV) for private sheets.
  if (text.trim().toLowerCase().startsWith("<!doctype html") || text.trim().startsWith("<html")) {
    throw new GoogleSheetFetchError(
      "Таблиця приватна. Відкрийте доступ «для всіх, хто має посилання» і спробуйте ще раз.",
    );
  }

  return text;
}
