import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-4 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">Digital Vantage</p>
        <h1 className="text-4xl font-semibold">404</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Strona nie została znaleziona.</p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </header>
    </main>
  )
}
