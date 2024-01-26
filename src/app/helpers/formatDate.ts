export function formatDate(date: string) {
  if (date == isToday()) {
    return "Hoje"
  } else if (date == isYesterday()) {
    return "Ontem"
  } else {
    return date
  }
}

function isToday() {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return today;
}

function isYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const date = new Date(yesterday).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return date;
}
