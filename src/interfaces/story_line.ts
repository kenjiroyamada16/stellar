export interface IStoryLine {
  id: number;
  text: string;
  talker?: string,
  kind: LineKinds;
  endDelay?: number;
  nextLineId: number;
  initialDelay?: number;
  firstOption?: string,
  secondOption?: string,
  firstOptionLineId?: number,
  secondOptionLineId?: number,
}

export enum LineKinds {
  title = 'title',
  line = 'line',
  none = 'none',
  narrative = 'narrative',
}

export enum LineTalker {
  star = 'star',
  moon = 'moon',
}