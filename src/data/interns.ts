/**
 * Everyone who has completed the first exercise. Add yourself in your first
 * pull request — keep the list sorted by name; the tests check it.
 */
export type Intern = {
  name: string
  /** GitHub username, without the @. */
  github: string
  /** One short sentence: what you want to learn here. */
  goal: string
}

export const interns: Intern[] = [
  {
    name: 'Konrad Barejko',
    github: 'kbarejko',
    goal: 'Help every intern ship a first pull request in their first week.',
  },
]
