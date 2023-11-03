const formatDate = (value: Date): string => {
  const date = new Date(value);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = String(date.getFullYear());

  return `${dia}/${mes}/${ano}`;
}

export default formatDate;