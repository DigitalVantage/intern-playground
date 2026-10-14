export function peopleSoFar(count: number): string {
  const pr = new Intl.PluralRules('en', { type: 'cardinal' });
  const rule = pr.select(count);

  switch (rule) {
    case 'one':
      return `${count} person so far`;
    default:
      return `${count} people so far`;
  }
}