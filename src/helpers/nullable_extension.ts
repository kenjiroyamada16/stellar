const nullableNumber = (value: number | null | undefined) => {
  if (value != null) return value;

  return 0;
}

const nullableString = (value: string | null | undefined) => {
  if (value != null) return value;

  return '';
}

const nullableBool = (value: boolean | null | undefined) => {
  if (value != null) return value;

  return false;
}

export { nullableNumber, nullableString };