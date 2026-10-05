import { interns } from '@/data/interns'

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-4 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">Digital Vantage</p>
        <h1 className="text-4xl font-semibold">Intern playground</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Everyone below shipped their first pull request here.
        </p>
      </header>
      <ul className="flex flex-col gap-4">
        {interns.map((intern) => (
          <li
            key={intern.github}
            className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <a
              href={`https://github.com/${intern.github}`}
              className="font-medium underline-offset-4 hover:underline"
            >
              {intern.name}
            </a>
            <p className="text-zinc-600 dark:text-zinc-400">{intern.goal}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
