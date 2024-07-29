export interface IStoryLine {
  id: number;
  text: string;
  isHe?: boolean;
  talker?: string,
  kind: LineKinds;
  timeout?: number;
  tilting?: boolean;
  endDelay?: number;
  nextLineId: number;
  firstOption?: string,
  secondOption?: string,
  initialDelay?: number;
  firstOptionLineId?: number,
  secondOptionLineId?: number,
}

export enum LineKinds {
  title = 'title',
  line = 'line',
  none = 'none',
  input = 'input',
  narrative = 'narrative',
}