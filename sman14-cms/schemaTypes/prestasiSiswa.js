export default {
  name: 'prestasiSiswa',
  title: 'Prestasi Siswa',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Prestasi',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
    },
    {
      name: 'namaSiswa',
      title: 'Nama Siswa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'foto',
      title: 'Foto Pemenang/Piala',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tingkatPrestasi',
      title: 'Tingkat Prestasi',
      type: 'string',
      options: {
        list: [
          { title: 'Sekolah', value: 'sekolah' },
          { title: 'Kota', value: 'kota' },
          { title: 'Provinsi', value: 'provinsi' },
          { title: 'Nasional', value: 'nasional' },
          { title: 'Internasional', value: 'internasional' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tanggal',
      title: 'Tanggal Prestasi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi',
      type: 'text',
      rows: 4,
    },
  ],
};
