import { describe, expect, it } from 'vitest'

import { interns } from '@/data/interns'

import { duplicateHandles, isSortedByName, isValidGithubUsername } from './interns'

describe('the interns list', () => {
  it('is sorted by name', () => {
    expect(isSortedByName(interns)).toBe(true)
  })

  it('has every GitHub username once', () => {
    expect(duplicateHandles(interns)).toEqual([])
  })

  it('has a goal for everyone, and valid GitHub usernames', () => {
    for (const intern of interns) {
      expect(intern.goal.trim()).not.toBe('')
      // Шаг 5: заменили старую проверку на вашу новую функцию валидации
      expect(isValidGithubUsername(intern.github)).toBe(true)
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

// Шаг 1: Добавляем новый блок тестов для isValidGithubUsername
describe('isValidGithubUsername', () => {
  it('accepts valid GitHub usernames', () => {
    expect(isValidGithubUsername('kbarejko')).toBe(true)
    expect(isValidGithubUsername('anna-kowalska')).toBe(true)
    expect(isValidGithubUsername('A1')).toBe(true)
    expect(isValidGithubUsername('a'.repeat(39))).toBe(true)
  })

  it('rejects invalid GitHub usernames', () => {
    expect(isValidGithubUsername('-anna')).toBe(false)
    expect(isValidGithubUsername('anna-')).toBe(false)
    expect(isValidGithubUsername('anna--k')).toBe(false)
    expect(isValidGithubUsername('anna kowalska')).toBe(false)
    expect(isValidGithubUsername('@anna')).toBe(false)
    expect(isValidGithubUsername('')).toBe(false)
    expect(isValidGithubUsername('a'.repeat(40))).toBe(false)
  })
})