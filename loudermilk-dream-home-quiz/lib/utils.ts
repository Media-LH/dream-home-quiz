export function normalizePhoneToE164(input: string) {
  const digits = (input || '').replace(/\D+/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `+1${digits}`;
  if (digits.startsWith('1') && digits.length === 11) return `+${digits}`;
  if (digits.startsWith('0')) return '';
  return `+${digits}`;
}
