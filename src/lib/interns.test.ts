import { describe, expect, it } from 'vitest'

import { interns } from '@/data/interns'

import { duplicateHandles, isSortedByName } from './interns'

describe('the interns list', () => {
  it('is sorted by name', () => {
    expect(isSortedByName(interns)).toBe(true)
  })

  it('has every GitHub username once', () => {
    expect(duplicateHandles(interns)).toEqual([])
  })

  it('has a goal for everyone, without the @ in usernames', () => {
    for (const intern of interns) {
      expect(intern.goal.trim()).not.toBe('')
      expect(intern.github.startsWith('@')).toBe(false)
    }
  })
})

describe('isSortedByName', () => {
  const at = (name: string) => ({ name, github: name, goal: 'x' })

  it('sorts Polish letters where a Polish reader expects them', () => {
    expect(isSortedByName([at('Łukasz'), at('Marta')])).toBe(true)
    expect(isSortedByName([at('Marta'), at('Łukasz')])).toBe(false)
  })
})

describe('duplicateHandles', () => {
  it('treats usernames case-insensitively', () => {
    const list = [
      { name: 'A', github: 'anna', goal: 'x' },
      { name: 'B', github: 'Anna', goal: 'x' },
    ]
    expect(duplicateHandles(list)).toEqual(['Anna'])
  })
})
