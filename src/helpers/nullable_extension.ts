const nullableNumber = (value: number | null | undefined) => {
  if (value != null) return value;

  return 0;
}

const nullableString = (value: string | null | undefined) => {
  if (value != null) return value;

  return '';
}

export { nullableNumber, nullableString };