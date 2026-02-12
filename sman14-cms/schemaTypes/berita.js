export default {
  name: 'berita',
  title: 'Berita',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Berita',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(200),
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
          { title: 'Kegiatan', value: 'kegiatan' },
          { title: 'Prestasi', value: 'prestasi' },
          { title: 'Pengumuman', value: 'pengumuman' },
          { title: 'Akademik', value: 'akademik' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tanggal',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'foto',
      title: 'Foto Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Ringkasan Berita',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(20).max(300),
    },
    {
      name: 'konten',
      title: 'Konten Lengkap',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
