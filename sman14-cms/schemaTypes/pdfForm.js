import {DocumentPdfIcon} from '@sanity/icons'

export default {
  name: 'pdfForm',
  title: 'PDF / Form',
  type: 'object',
  icon: DocumentPdfIcon,
  fields: [
    {
      name: 'judul',
      title: 'Judul PDF',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: 'file',
      title: 'File PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    },
  ],
  preview: {
    select: {
      title: 'judul',
      subtitle: 'deskripsi',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'PDF / Form',
        subtitle: subtitle || 'File PDF di dalam berita',
      }
    },
  },
}
