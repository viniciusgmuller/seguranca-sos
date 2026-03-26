import { describe, expect, test, mock, beforeEach } from 'bun:test'

// Mock Resend before importing the module
const mockSend = mock(() => Promise.resolve({ data: { id: 'test-id' }, error: null }))

mock.module('resend', () => ({
  Resend: class {
    emails = { send: mockSend }
  },
}))

// Helper to extract the afterChange hook from the collection config
async function getAfterChangeHook() {
  const { ContactSubmissions } = await import('../ContactSubmissions')
  const hooks = ContactSubmissions.hooks?.afterChange
  if (!hooks || hooks.length === 0) throw new Error('No afterChange hook found')
  return hooks[0]
}

function createMockArgs(overrides: Record<string, unknown> = {}) {
  return {
    doc: {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(54) 99999-0000',
      message: 'Gostaria de um orçamento para segurança de evento.',
    },
    operation: 'create' as const,
    req: {
      payload: {
        findGlobal: mock(() =>
          Promise.resolve({ email: 'admin@sosseguranca.com.br' }),
        ),
      },
    },
    ...overrides,
  }
}

describe('ContactSubmissions afterChange hook', () => {
  beforeEach(() => {
    mockSend.mockClear()
    process.env.RESEND_API_KEY = 're_test_key'
  })

  test('sends email with correct payload on create', async () => {
    const hook = await getAfterChangeHook()
    const args = createMockArgs()

    await hook(args as never)

    expect(mockSend).toHaveBeenCalledTimes(1)
    const call = mockSend.mock.calls[0][0] as Record<string, unknown>
    expect(call.to).toBe('admin@sosseguranca.com.br')
    expect(call.from).toBe('S.O.S Segurança <onboarding@resend.dev>')
    expect(call.subject).toBe('Novo contato via site — João Silva')
    expect(call.html).toContain('João Silva')
    expect(call.html).toContain('joao@example.com')
    expect(call.html).toContain('(54) 99999-0000')
    expect(call.html).toContain('Gostaria de um orçamento para segurança de evento.')
  })

  test('does not send email on update operation', async () => {
    const hook = await getAfterChangeHook()
    const args = createMockArgs({ operation: 'update' })

    await hook(args as never)

    expect(mockSend).not.toHaveBeenCalled()
  })

  test('returns doc even when Resend throws an error', async () => {
    mockSend.mockImplementationOnce(() => Promise.reject(new Error('API error')))

    const hook = await getAfterChangeHook()
    const args = createMockArgs()

    const result = await hook(args as never)

    expect(result).toEqual(args.doc)
  })

  test('skips email when RESEND_API_KEY is not set', async () => {
    delete process.env.RESEND_API_KEY

    const hook = await getAfterChangeHook()
    const args = createMockArgs()

    const result = await hook(args as never)

    expect(result).toEqual(args.doc)
    expect(mockSend).not.toHaveBeenCalled()
  })

  test('skips email when site-config has no email', async () => {
    const hook = await getAfterChangeHook()
    const args = createMockArgs({
      req: {
        payload: {
          findGlobal: mock(() => Promise.resolve({ email: undefined })),
        },
      },
    })

    const result = await hook(args as never)

    expect(result).toEqual(args.doc)
    expect(mockSend).not.toHaveBeenCalled()
  })
})
