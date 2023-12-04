export const formatDate = (value: Date): string => {
  const date = new Date(value);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = String(date.getFullYear());

  return `${dia}/${mes}/${ano}`;
}

export const converStringToDate = (value: string): Date => {
  const date = value.split('/');
  const dia = Number(date[0]);
  const mes = Number(date[1]) - 1;
  const ano = Number(date[2]);

  return new Date(ano, mes, dia);
}