import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "vn9r43ot",
  dataset: "production",
  useCdn: false, // Ubah ke false untuk development
  apiVersion: "2026-02-13",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const fetchPrestasiSiswa = async () => {
  const query = `*[_type == "prestasiSiswa"] | order(tanggal desc)[0..3] {
    _id,
    judul,
    namaSiswa,
    foto,
    tingkatPrestasi,
    tanggal,
    deskripsi
  }`;
  return await client.fetch(query);
};

export const fetchAlumni = async () => {
  const query = `*[_type == "alumni"] | order(tahunLulus desc) {
    _id,
    namaAlumni,
    tahunLulus,
    testimoni,
    foto,
    pekerjaanSaatIni,
    universitas
  }`;
  return await client.fetch(query);
};

export const fetchBerita = async () => {
  const query = `*[_type == "berita"] | order(tanggal desc)[0..4] {
    _id,
    judul,
    slug,
    kategori,
    tanggal,
    excerpt,
    foto,
    konten
  }`;
  return await client.fetch(query);
};

export const fetchStrukturOrganisasi = async () => {
  const query = `*[_type == "strukturOrganisasi"] | order(urutan asc) {
    _id,
    posisi,
    nama,
    foto,
    nip,
    gelar,
    email,
    nomorTelepon
  }`;
  return await client.fetch(query);
};

export const fetchPendaftaran = async () => {
  const query = `*[_type == "pendaftaran"] {
    _id,
    judul,
    tahunAjaran,
    deskripsi,
    posterNilai,
    berkasInformasi[] {
      nama,
      file
    },
    linkPendaftaran,
    tglMulai,
    tglSelesai,
    status
  }`;
  return await client.fetch(query);
};

export const fetchSaranaPrasarana = async () => {
  const query = `*[_type == "saranaPrasarana"] | order(urutan asc) {
    _id,
    nama,
    kategori,
    foto,
    deskripsi,
    kondisi,
    urutan
  }`;
  return await client.fetch(query);
};

export const fetchSertifikat = async () => {
  const query = `*[_type == "sertifikat"] | order(urutan asc) {
    _id,
    nama,
    tipe,
    logo,
    deskripsi,
    tanggalPemerolehan,
    tahunKadaluarsa
  }`;
  return await client.fetch(query);
};

export const fetchGaleri = async () => {
  const query = `*[_type == "galeri"] | order(tanggal desc) {
    _id,
    judul,
    slug,
    kategori,
    deskripsi,
    foto,
    tanggal
  }`;
  return await client.fetch(query);
};

export const fetchGaleriBySlug = async (slug) => {
  const query = `*[_type == "galeri" && slug.current == $slug][0] {
    _id,
    judul,
    kategori,
    deskripsi,
    foto,
    tanggal
  }`;
  return await client.fetch(query, { slug });
};