export default function normalizeCategory(str) {
  if (str.includes('Milk')) return 'Milk';
  if (str.includes('Other')) return 'Other';

  return str;
}
