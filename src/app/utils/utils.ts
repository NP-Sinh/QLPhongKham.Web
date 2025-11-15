 export function convertToVNDate(isoDate: string): string {
  if (!isoDate) return '';

  const dateOnly = isoDate.split('T')[0];
  const [year, month, day] = dateOnly.split('/');

  return `${day}/${month}/${year}`;
}

export function convertVNDateToISO(vnDate: string): string {
  if (!vnDate) return '';

  const [day, month, year] = vnDate.split('/');
  return `${year}-${month}-${day}`; // "1990-05-14"
}

export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}
