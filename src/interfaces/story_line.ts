export interface IStoryLine {
  id: number;
  text: string;
  talker?: string,
  kind: LineKinds;
  nextLineId: number;
  initialDelay?: number;
  endDelay?: number;
}

export enum LineKinds {
  title = 'title',
  line = 'line',
  none = 'none',
}