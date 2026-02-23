// lib/api.ts

const BASE_URL = "https://api.hadith.gading.dev/books";

/* =========================
   TYPES
========================= */

export interface Book {
  id: string;
  name: string;
  available: number;
}

export interface HadithContent {
  number: number;
  arab: string;
  id: string; // terjemahan indonesia
}

export interface HadithResponse {
  code: number;
  message: string;
  data: {
    name: string;
    id: string;
    available: number;
    contents: HadithContent;
  };
  error: boolean;
}

export interface HadithRangeResponse {
  code: number;
  message: string;
  data: {
    name: string;
    id: string;
    available: number;
    hadiths: HadithContent[];
  };
  error: boolean;
}

export interface BooksResponse {
  code: number;
  message: string;
  data: Book[];
  error: boolean;
}

/* =========================
   FETCH HELPER
========================= */

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}

/* =========================
   ENDPOINT FUNCTIONS
========================= */

/**
 * Get all available hadith books
 */
export async function getBooks(): Promise<BooksResponse> {
  return fetcher<BooksResponse>(BASE_URL);
}

/**
 * Get hadith by range (max 300 range)
 */
export async function getHadithRange(
  name: string,
  start: number,
  end: number
): Promise<HadithRangeResponse> {
  if (end - start > 300) {
    throw new Error("Max range is 300");
  }

  return fetcher<HadithRangeResponse>(
    `${BASE_URL}/${name}?range=${start}-${end}`
  );
}

/**
 * Get specific hadith by number
 */
export async function getSpecificHadith(
  name: string,
  number: string | number
): Promise<HadithResponse> {
  return fetcher<HadithResponse>(
    `${BASE_URL}/${name}/${number}`
  );
}

// lib/api.ts

export async function getBooksList() {
  const res = await fetch("https://api.hadith.gading.dev/books", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}