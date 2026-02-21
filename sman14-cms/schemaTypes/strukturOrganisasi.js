export default {
  name: 'strukturOrganisasi',
  title: 'Struktur Organisasi',
  type: 'document',
  fields: [
    {
      name: 'posisi',
      title: 'Posisi/Jabatan',
      type: 'string',
      options: {
        list: [
          { title: 'Kepala Sekolah', value: 'kepala' },
          { title: 'Wakil Kepala Bidang Kurikulum', value: 'wakilKuriulum' },
          { title: 'Wakil Kepala Bidang Sarana & Prasarana', value: 'wakilSarana' },
          { title: 'Wakil Kepala Bidang Hubungan Masyarakat', value: 'wakilHumas' },
          { title: 'Wakil Kepala Bidang Kesiswaan', value: 'wakilKesiswaan' },
          { title: 'Kepala Administrasi', value: 'kepalaTata' },
          { title: 'Kaur Kepegawaian', value: 'kaurKepegawaian' },
          { title: 'Kaur Keuangan', value: 'kaurKeuangan' },
          { title: 'Kaur Persuratan', value: 'kaurPersuratan' },
          { title: 'Kepala Komite Sekolah', value: 'kepalaKomite' },
          { title: 'Anggota Komite', value: 'anggotaKomite' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'nama',
      title: 'Nama Lengkap',
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
      name: 'gelar',
      title: 'Gelar Pendidikan',
      type: 'string',
      description: 'Contoh: S.Pd, S.Si, M.A',
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
