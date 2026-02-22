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
      name: 'galeri',
      title: 'Galeri Foto Berita (Opsional)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'gambarBerita',
          title: 'Gambar Berita',
          fields: [
            { name: 'image', type: 'image', title: 'Foto', options: { hotspot: true }, validation: Rule => Rule.required() },
            {
              name: 'posisi',
              title: 'Posisi Muncul',
              type: 'string',
              options: {
                list: [
                  { title: 'Atas (Sebelum Teks)', value: 'top' },
                  { title: 'Tengah (Setelah Paragraf 1)', value: 'p1' },
                  { title: 'Tengah (Setelah Paragraf 2)', value: 'p2' },
                  { title: 'Bawah (Setelah Paragraf 3)', value: 'p3' },
                  { title: 'Akhir (Paling Bawah)', value: 'bottom' },
                ],
              },
              initialValue: 'p1'
            },
            {
              name: 'layout',
              title: 'Gaya Tampilan',
              type: 'string',
              options: {
                list: [
                  { title: 'Lebar Penuh (Center)', value: 'full' },
                  { title: 'Kiri (Text Wrap)', value: 'left' },
                  { title: 'Kanan (Text Wrap)', value: 'right' },
                ],
              },
              initialValue: 'full'
            },
            { name: 'caption', title: 'Keterangan Gambar (Opsional)', type: 'string' }
          ],
          preview: {
            select: { title: 'caption', subtitle: 'posisi', media: 'image' },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Gambar Berita',
                subtitle: `Posisi: ${subtitle}`,
                media
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Tambahkan foto tambahan dan atur posisinya di dalam artikel.',
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
    {
      name: 'penulis',
      title: 'Penulis Berita',
      type: 'string',
      initialValue: 'Admin SMAN 14',
    },
    {
      name: 'hashtag',
      title: 'Hashtag',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
};
