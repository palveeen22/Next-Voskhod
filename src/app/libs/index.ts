export const formattedNumber = (number: number | undefined): string => {
  if (typeof number === 'undefined') {
    return ''; // Or any default value you want to show for undefined price
  }
  return number.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB', // Change currency to RUB for Russian Ruble
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
