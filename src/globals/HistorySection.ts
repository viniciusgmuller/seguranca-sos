import type { GlobalConfig } from 'payload'

export const HistorySection: GlobalConfig = {
  slug: 'history-section',
  label: 'Seção História',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'paragraphs',
      label: 'Parágrafos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          label: 'Texto',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Imagem de Fundo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'founders',
      label: 'Fundadores',
      type: 'text',
      defaultValue: 'Rodinei, Rosani e Eduardo Cordova — Fundadores',
    },
  ],
}
