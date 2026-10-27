import ClientsTabs from './ClientsTabs'
import { clients, type ClientCategory } from '@/content/site'

export default function ClientsSection() {
  const grouped: Record<ClientCategory, { id: string; name: string; category: ClientCategory }[]> = {
    fixo: [],
    evento: [],
    parceiro: [],
  }

  clients.forEach((client, index) => {
    grouped[client.category].push({
      id: String(index),
      name: client.name,
      category: client.category,
    })
  })

  return (
    <section id="Clientes" className="bg-white py-16 md:py-[120px] px-5 md:px-20">
      <div className="max-w-[1440px] mx-auto w-full">
        <ClientsTabs grouped={grouped} />
      </div>
    </section>
  )
}
