import type { Intern } from '@/data/interns'

/** Names in alphabetical order, compared the way a Polish reader expects. */
export function isSortedByName(list: Intern[]): boolean {
  return list.every(
    (intern, i) => i === 0 || list[i - 1].name.localeCompare(intern.name, 'pl') <= 0,
  )
}

/** GitHub usernames that appear more than once, case-insensitively. */
export function duplicateHandles(list: Intern[]): string[] {
  const seen = new Set<string>()
  const dupes = new Set<string>()
  for (const { github } of list) {
    const key = github.toLowerCase()
    if (seen.has(key)) dupes.add(github)
    seen.add(key)
  }
  return [...dupes]
}
