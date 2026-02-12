export default {
  name: 'saranaPrasarana',
  title: 'Sarana & Prasarana',
  type: 'document',
  fields: [
    {
      name: 'nama',
      title: 'Nama Sarana/Prasarana',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Contoh: Laboratorium Komputer, Perpustakaan, Lapangan Olahraga',
    },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Ruang Pembelajaran', value: 'pembelajaran' },
          { title: 'Laboratorium', value: 'lab' },
          { title: 'Perpustakaan & Media', value: 'perpustakaan' },
          { title: 'Olahraga & Seni', value: 'olahraga' },
          { title: 'Ibadah', value: 'ibadah' },
          { title: 'Kantor Administrasi', value: 'administrasi' },
          { title: 'Kesehatan & Sanitasi', value: 'kesehatan' },
          { title: 'Lainnya', value: 'lainnya' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'kondisi',
      title: 'Kondisi',
      type: 'string',
      options: {
        list: [
          { title: 'Sangat Baik', value: 'sangat-baik' },
          { title: 'Baik', value: 'baik' },
          { title: 'Cukup', value: 'cukup' },
          { title: 'Perlu Perbaikan', value: 'butuh-perbaikan' },
        ],
      },
    },
    {
      name: 'urutan',
      title: 'Urutan Tampil',
      type: 'number',
    },
  ],
};
