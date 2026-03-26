import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Serviço',
    plural: 'Serviços',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'backgroundImage'],
  },
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
      name: 'backgroundImage',
      label: 'Imagem de Fundo',
      type: 'upload',
      relationTo: 'media',
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
