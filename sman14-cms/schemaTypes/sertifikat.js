export default {
  name: 'sertifikat',
  title: 'Sertifikat',
  type: 'document',
  fields: [
    {
      name: 'nama',
      title: 'Nama Sertifikat',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Contoh: Sertifikat Akreditasi, Piagam Penghargaan',
    },
    {
      name: 'foto',
      title: 'Gambar Sertifikat',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload gambar sertifikat (JPG/PNG) untuk ditampilkan langsung di website.',
    },
    {
      name: 'filePDF',
      title: 'File PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload file sertifikat dalam format PDF (Opsional jika sudah ada gambar)',
    },
  ],
};
