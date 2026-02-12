export default {
  name: 'alumni',
  title: 'Alumni',
  type: 'document',
  fields: [
    {
      name: 'namaAlumni',
      title: 'Nama Alumni',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tahunLulus',
      title: 'Tahun Lulus',
      type: 'number',
      validation: (Rule) => Rule.required().min(2000).max(2100),
    },
    {
      name: 'foto',
      title: 'Foto Alumni',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'universitas',
      title: 'Universitas/Kampus',
      type: 'string',
    },
    {
      name: 'pekerjaanSaatIni',
      title: 'Pekerjaan Saat Ini',
      type: 'string',
    },
    {
      name: 'testimoni',
      title: 'Testimoni',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(20).max(500),
    },
  ],
};
