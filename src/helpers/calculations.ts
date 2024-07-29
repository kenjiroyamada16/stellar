const randomFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const round = (number: number): number => {
  return Math.round(number);
}

export { randomFromInterval, round }