
export function convertToVNDate(date: string | Date): string {
  if (!date) return '';
  let dateOnly: string;
  if (date instanceof Date) {
    dateOnly = date.toISOString().split('T')[0];
  } else {
    dateOnly = date.split('T')[0];
  }

  const [year, month, day] = dateOnly.split('-');
  return `${day}/${month}/${year}`;
}

export function convertVNDateToISO(vnDate: string): string {
  if (!vnDate) return '';

  const [day, month, year] = vnDate.split('/');
  return `${year}-${month}-${day}`;
}

export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}
