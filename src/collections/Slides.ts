import type { CollectionConfig } from 'payload'

export const Slides: CollectionConfig = {
  slug: 'slides',
  labels: {
    singular: 'Slide',
    plural: 'Slides',
  },
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'order', 'image'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      label: 'Imagem',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'caption',
      label: 'Legenda',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      label: 'Ordem',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Menor número aparece primeiro',
      },
    },
  ],
}
