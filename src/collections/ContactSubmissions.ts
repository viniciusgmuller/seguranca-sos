import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { Resend } from 'resend'

const sendNotificationEmail: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc

  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[ContactSubmissions] RESEND_API_KEY is not set — skipping email notification')
      return doc
    }

    const siteConfig = await req.payload.findGlobal({ slug: 'site-config' })
    const recipientEmail = siteConfig?.email as string | undefined

    if (!recipientEmail) {
      console.error('[ContactSubmissions] No recipient email found in site-config — skipping email notification')
      return doc
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'S.O.S Segurança <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `Novo contato via site — ${doc.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
            Novo contato recebido
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555; width: 120px; vertical-align: top;">Nome:</td>
              <td style="padding: 10px; color: #333;">${doc.name}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">E-mail:</td>
              <td style="padding: 10px; color: #333;">
                <a href="mailto:${doc.email}" style="color: #e74c3c;">${doc.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Telefone:</td>
              <td style="padding: 10px; color: #333;">${doc.phone}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Mensagem:</td>
              <td style="padding: 10px; color: #333; white-space: pre-wrap;">${doc.message}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
            Esta mensagem foi enviada automaticamente pelo site S.O.S Segurança.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('[ContactSubmissions] Failed to send email notification:', error)
  }

  return doc
}

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contato Recebido',
    plural: 'Contatos Recebidos',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [sendNotificationEmail],
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      label: 'Mensagem',
      type: 'textarea',
      required: true,
    },
  ],
}
