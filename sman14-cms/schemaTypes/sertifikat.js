export default {
  name: 'sertifikat',
  title: 'Sertifikat & Akreditasi',
  type: 'document',
  fields: [
    {
      name: 'nama',
      title: 'Nama Sertifikat',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Contoh: Sertifikat ISO 9001, Akreditasi Nasional A',
    },
    {
      name: 'tipe',
      title: 'Tipe Sertifikat',
      type: 'string',
      options: {
        list: [
          { title: 'Akreditasi Sekolah', value: 'akreditasi' },
          { title: 'Sertifikasi Internasional', value: 'internasional' },
          { title: 'Sertifikasi Nasional', value: 'nasional' },
          { title: 'Penghargaan', value: 'penghargaan' },
          { title: 'Lainnya', value: 'lainnya' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo/Gambar Sertifikat',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
    },
    {
      name: 'tanggalPemerolehan',
      title: 'Tanggal Pemerolehan',
      type: 'date',
    },
    {
      name: 'tahunKadaluarsa',
      title: 'Tahun Kadaluarsa',
      type: 'number',
      description: 'Tahun sertifikat berlaku sampai (jika ada)',
    },
    {
      name: 'urutan',
      title: 'Urutan Tampil',
      type: 'number',
    },
  ],
};
