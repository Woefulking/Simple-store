export const formatOrderDate = (date: number) =>
  new Intl.DateTimeFormat('ru-RU').format(new Date(date));
