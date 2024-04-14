export interface IStoryLine {
  id: number;
  text: string;
  talker: string | null,
  kind: LineKinds;
  nextLineId: number;
}

export enum LineKinds {
  title = 'title',
  line = 'line',
}