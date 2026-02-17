import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "vn9r43ot", // Ganti dengan ID dari sanity.io/manage
  dataset: "production",
  useCdn: false, // Set false supaya data yang diambil selalu yang paling baru
  apiVersion: "2026-02-13", // Gunakan tanggal hari ini atau sesuai versi API Sanity
});