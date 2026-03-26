import type { GlobalConfig } from 'payload'

export const WhySection: GlobalConfig = {
  slug: 'why-section',
  label: 'Seção Por Que a SOS',
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
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      required: true,
    },
    {
      name: 'bulletPoints',
      label: 'Diferenciais',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          label: 'Título',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Subtítulo',
          type: 'text',
        },
      ],
    },
  ],
}
