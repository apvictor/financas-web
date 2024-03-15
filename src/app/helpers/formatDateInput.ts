export function formatDateInput(date: Date) {

  const data = new Date(date);

  const year = data.getFullYear()
  const month = data.getMonth()
  const day = data.getDate()

  return `${year}-${(month + 1) < 9 ? `0${month + 1}` : month + 1}-${day < 9 ? `0${day}` : day}`
}
