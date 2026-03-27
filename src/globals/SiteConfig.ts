import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Configurações do Site',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Geral',
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Contato',
          fields: [
            {
              name: 'phone',
              label: 'Telefone',
              type: 'text',
              required: true,
            },
            {
              name: 'whatsapp',
              label: 'WhatsApp',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              label: 'E-mail',
              type: 'text',
              required: true,
            },
            {
              name: 'address',
              label: 'Endereço',
              type: 'textarea',
              required: true,
            },
            {
              name: 'mapCoordinates',
              label: 'Coordenadas do Mapa',
              type: 'group',
              fields: [
                {
                  name: 'lat',
                  label: 'Latitude',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'lng',
                  label: 'Longitude',
                  type: 'number',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Redes Sociais',
          fields: [
            {
              name: 'instagram',
              label: 'Instagram (URL)',
              type: 'text',
            },
            {
              name: 'facebook',
              label: 'Facebook (URL)',
              type: 'text',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              label: 'Meta Title',
              type: 'text',
              required: true,
            },
            {
              name: 'metaDescription',
              label: 'Meta Description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'ogImage',
              label: 'Open Graph Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'gaId',
              label: 'Google Analytics / GTM ID',
              type: 'text',
              admin: {
                description: 'Ex: G-XXXXXXXXXX ou GTM-XXXXXXX',
              },
            },
          ],
        },
      ],
    },
  ],
}
