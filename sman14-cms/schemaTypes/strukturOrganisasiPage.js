export default {
  name: 'strukturOrganisasiPage',
  title: 'Halaman Struktur Organisasi',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Halaman',
      type: 'string',
      initialValue: 'Struktur Organisasi',
      validation: Rule => Rule.required()
    },
    {
      name: 'deskripsiSingkat',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      description: 'Muncul di bawah judul halaman.'
    },
    {
      name: 'keterangan',
      title: 'Keterangan Lengkap',
      type: 'text', 
      rows: 10,
      description: 'Penjelasan detail mengenai struktur organisasi (bisa menggunakan paragraf).'
    },
    {
      name: 'filePDF',
      title: 'File PDF Struktur Organisasi',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      description: 'Upload file PDF bagan struktur organisasi di sini.'
    },
    {
      name: 'previewImage',
      title: 'Gambar Preview Struktur (Opsional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Gambar bagan untuk ditampilkan di halaman sebelum diunduh.'
    }
  ]
}