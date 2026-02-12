export default {
  name: 'galeri',
  title: 'Galeri Foto',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Album',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Contoh: Upacara Bendera, Wisata Pendidikan, Acara Sekolah',
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'judul',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Kegiatan Akademik', value: 'akademik' },
          { title: 'Acara Sekolah', value: 'acara' },
          { title: 'Ekstrakurikuler', value: 'ekstrakurikuler' },
          { title: 'Prestasi', value: 'prestasi' },
          { title: 'Wisata Pendidikan', value: 'wisata' },
          { title: 'Fasilitas', value: 'fasilitas' },
          { title: 'Lainnya', value: 'lainnya' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi',
      type: 'text',
      rows: 3,
    },
    {
      name: 'foto',
      title: 'Foto Album',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Upload minimal 1 foto',
    },
    {
      name: 'tanggal',
      title: 'Tanggal Kegiatan',
      type: 'date',
    },
    {
      name: 'urutan',
      title: 'Urutan Tampil',
      type: 'number',
    },
  ],
};
