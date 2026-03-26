import { getPayload } from 'payload'
import config from '@payload-config'
import ClientsTabs from './ClientsTabs'

type Category = 'fixo' | 'evento' | 'parceiro'

export default async function ClientsSection() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'clients',
    sort: 'name',
    limit: 500,
  })

  const grouped: Record<Category, { id: string; name: string; category: Category }[]> = {
    fixo: [],
    evento: [],
    parceiro: [],
  }

  for (const doc of docs) {
    const cat = doc.category as Category
    if (grouped[cat]) {
      grouped[cat].push({
        id: String(doc.id),
        name: doc.name as string,
        category: cat,
      })
    }
  }

  return (
    <section id="Clientes" className="bg-white py-[120px] px-8 md:px-20">
      <ClientsTabs grouped={grouped} />
    </section>
  )
}
