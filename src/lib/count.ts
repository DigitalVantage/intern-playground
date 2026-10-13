export function peopleSoFar(count: number): string {
  const pr = new Intl.PluralRules('en');
  const rule = pr.select(count);
  const word = rule === 'one' ? 'person' : 'people';
  
  return `${count} ${word} so far`;
}