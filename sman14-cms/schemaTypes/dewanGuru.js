export default {
  name: 'dewanGuru',
  title: 'Dewan Guru',
  type: 'document',
  fields: [
    {
      name: 'nama',
      title: 'Nama Guru',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'foto',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'nip',
      title: 'NIP (Nomor Induk Pegawai)',
      type: 'string',
    },
    {
      name: 'bidang',
      title: 'Bidang/Mata Pelajaran',
      type: 'string',
      description: 'Contoh: Matematika, Bahasa Inggris, IPA',
    },
    {
      name: 'gelar',
      title: 'Gelar Pendidikan',
      type: 'string',
      description: 'Contoh: S.Pd, S.Si, M.Sc',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'nomorTelepon',
      title: 'Nomor Telepon',
      type: 'string',
    },
    {
      name: 'urutan',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka lebih kecil = tampil lebih depan',
    },
  ],
};
