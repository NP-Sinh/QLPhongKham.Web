
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

// Nếu trường là DateOnly: yyyy-MM-dd
export function convertVNDateToISO(vnDate: string): string {
  if (!vnDate) return '';

  const [day, month, year] = vnDate.split('/');
  return `${year}-${month}-${day}`;
}

export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}
// Nếu trường là DateTime: yyyy-MM-ddTHH:mm:ss
export function convertVNDateTimeToISO(vnDate: string, time: string): string {
  const [day, month, year] = vnDate.split('/');
  return `${year}-${month}-${day}T${time}:00`;
}
