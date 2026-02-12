export default {
  name: 'pendaftaran',
  title: 'Pendaftaran & Informasi',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Pendaftaran',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Contoh: Pendaftaran Peserta Didik Baru 2026',
    },
    {
      name: 'tahunAjaran',
      title: 'Tahun Ajaran',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Contoh: 2025/2026',
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi',
      type: 'text',
      rows: 4,
    },
    {
      name: 'posterNilai',
      title: 'Poster/Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload poster atau banner pendaftaran',
    },
    {
      name: 'berkasInformasi',
      title: 'Berkas Informasi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nama',
              title: 'Nama File/Dokumen',
              type: 'string',
              description: 'Contoh: Syarat dan Ketentuan, Formulir Pendaftaran',
            },
            {
              name: 'file',
              title: 'File PDF',
              type: 'file',
              options: {
                accept: 'application/pdf',
              },
            },
          ],
        },
      ],
      description: 'Upload file PDF seperti syarat ketentuan, formulir, jadwal, dll',
    },
    {
      name: 'linkPendaftaran',
      title: 'Link Pendaftaran Online',
      type: 'url',
      description: 'URL untuk form pendaftaran online (Google Form, dll)',
    },
    {
      name: 'tglMulai',
      title: 'Tanggal Mulai Pendaftaran',
      type: 'datetime',
    },
    {
      name: 'tglSelesai',
      title: 'Tanggal Selesai Pendaftaran',
      type: 'datetime',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Segera Dibuka', value: 'segera' },
          { title: 'Pendaftaran Dibuka', value: 'dibuka' },
          { title: 'Pendaftaran Ditutup', value: 'ditutup' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
