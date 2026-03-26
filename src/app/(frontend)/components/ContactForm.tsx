'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 bg-white/60 rounded-xl text-center">
        <p className="font-heading text-2xl font-bold text-[#0a0a0a] mb-2">
          Obrigado!
        </p>
        <p className="font-body text-[15px] text-[#0a0a0a]/60">
          Recebemos seu contato. Logo entraremos em contato.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} id="email-form" className="flex flex-col gap-4">
      <input
        name="name"
        type="text"
        required
        placeholder="Insira aqui o seu nome"
        className="w-full px-5 py-4 bg-white/60 rounded-lg font-body text-[15px] text-[#0a0a0a] placeholder-[#0a0a0a]/40 outline-none focus:ring-2 focus:ring-[#0a0a0a]/20"
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          name="email"
          type="email"
          required
          placeholder="Seu e-mail"
          className="flex-1 px-5 py-4 bg-white/60 rounded-lg font-body text-[15px] text-[#0a0a0a] placeholder-[#0a0a0a]/40 outline-none focus:ring-2 focus:ring-[#0a0a0a]/20"
        />
        <input
          name="phone"
          type="tel"
          required
          placeholder="Telefone ou celular"
          className="flex-1 px-5 py-4 bg-white/60 rounded-lg font-body text-[15px] text-[#0a0a0a] placeholder-[#0a0a0a]/40 outline-none focus:ring-2 focus:ring-[#0a0a0a]/20"
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="Digite sua mensagem..."
        rows={5}
        className="w-full px-5 py-4 bg-white/60 rounded-lg font-body text-[15px] text-[#0a0a0a] placeholder-[#0a0a0a]/40 outline-none focus:ring-2 focus:ring-[#0a0a0a]/20 resize-none"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="self-start px-9 py-4 bg-[#0a0a0a] rounded-md font-body text-[15px] font-medium text-white hover:bg-[#2a2a2a] transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
      {status === 'error' && (
        <p className="font-body text-sm text-red-800">
          Ocorreu um erro ao enviar. Tente novamente.
        </p>
      )}
    </form>
  )
}
