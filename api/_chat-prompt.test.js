import { describe, it, expect } from 'vitest'
import { buildSystemPrompt, LEAD_TOOL, PRICING_PUBLISHED } from './_chat-prompt.js'

const prompt = buildSystemPrompt()

describe('buildSystemPrompt', () => {
  it('gives the assistant its name', () => {
    expect(prompt).toMatch(/\bBurnty\b/)
  })

  it('tells the assistant to answer to its name when asked who it is', () => {
    expect(prompt).toMatch(/you are Burnty/i)
  })

  it('tells the assistant to collect both a name and a mobile number', () => {
    expect(prompt).toMatch(/name/i)
    expect(prompt).toMatch(/mobile/i)
  })

  it('names the services the site actually offers', () => {
    for (const service of ['website', 'store', 'WhatsApp', 'SEO', 'mobile app']) {
      expect(prompt.toLowerCase()).toContain(service.toLowerCase())
    }
  })

  it('gives the real contact routes', () => {
    expect(prompt).toContain('socials@burntstack.com')
    expect(prompt).toContain('+91 79816 72639')
  })

  it('asserts no founding year, and forbids the assistant from claiming one', () => {
    // The whole site had this claim stripped out; the bot must not
    // reintroduce it in conversation. The prompt necessarily contains the
    // words "founded in" - in the prohibition - so what matters is that
    // no year is ever attached to them.
    expect(prompt).not.toMatch(/founded in \s*\d{4}/i)
    expect(prompt).not.toMatch(/\bsince\s+\d{4}\b/i)
    expect(prompt).not.toMatch(/\b(established|operating|in business)\b[^.]*\d{4}/i)
    expect(prompt).toMatch(/never say when the company was formed/i)
    expect(prompt).toMatch(/founded in/i) // the banned phrase is named explicitly
  })

  it('forbids inventing client or project counts', () => {
    expect(prompt).toMatch(/number of (clients|projects)|client count|how many (clients|projects)/i)
  })

  describe('while prices are unpublished', () => {
    it('is actually in that state', () => {
      // Guards the assertions below - flip PRICING_PUBLISHED and these
      // stop being the behaviour we want.
      expect(PRICING_PUBLISHED).toBe(false)
    })

    it('contains no rupee figure the bot could quote', () => {
      expect(prompt).not.toMatch(/₹\s?[\d,]+/)
      expect(prompt).not.toMatch(/\bRs\.?\s?[\d,]+/i)
    })

    it('tells the assistant to route pricing questions to a fixed quote', () => {
      expect(prompt).toMatch(/quote/i)
    })
  })
})

describe('LEAD_TOOL', () => {
  it('is a well-formed OpenAI-style function tool', () => {
    expect(LEAD_TOOL.type).toBe('function')
    expect(LEAD_TOOL.function.name).toBe('capture_lead')
    expect(typeof LEAD_TOOL.function.description).toBe('string')
  })

  it('requires exactly the two fields we cannot follow up without', () => {
    expect(LEAD_TOOL.function.parameters.required).toEqual(['name', 'mobile'])
  })

  it('offers requirement and email as optional context', () => {
    const props = LEAD_TOOL.function.parameters.properties
    expect(Object.keys(props).sort()).toEqual(['email', 'mobile', 'name', 'requirement'])
  })
})
