import { LineKinds, IStoryLine } from "@/interfaces/story_line";

export const lines: IStoryLine[] = [ 
  {
    id: 1,
    kind: LineKinds.title,
    text: 'O universo não me acolheu.',
    nextLineId: 2,
    talker: null,
  },
  {
    id: 2,
    kind: LineKinds.title,
    text: 'Mas não era dele que eu precisava.',
    nextLineId: 3,
    talker: null,
  },
  {
    id: 3,
    kind: LineKinds.title,
    text: 'Eu nunca precisei.',
    nextLineId: 4,
    talker: null,
  },
  {
    id: 4,
    kind: LineKinds.line,
    text: 'Na verdade, não é como se essa fosse a obrigação dele.',
    nextLineId: 5,
    talker: '?',
  },
  {
    id: 5,
    kind: LineKinds.line,
    text: 'Mas mesmo assim. ####Eu te entendo.########## Também gostaria de, ao menos uma vez, fazer parte de alguma coisa.',
    nextLineId: 6,
    talker: '?',
  },
  {
    id: 6,
    kind: LineKinds.line,
    text: 'Não necessariamente algo#### grande.',
    nextLineId: 7,
    talker: '?',
  },
  {
    id: 7,
    kind: LineKinds.line,
    text: 'Só algo que,######## sei lá, o qual eu pudesse chamar de##.###.###.## casa########?',
    nextLineId: 8,
    talker: '?',
  },
  {
    id: 8,
    kind: LineKinds.title,
    text: 'C#########A#########S#########A',
    nextLineId: 9,
    talker: null,
  },
  {
    id: 9,
    kind: LineKinds.title,
    text: 'Casa se foi ######## \n há muito tempo.',
    nextLineId: 10,
    talker: null,
  },
  {
    id: 10,
    kind: LineKinds.line,
    text: 'Tem razão########, estou completamente sozinho.###### . ######.',
    nextLineId: 11,
    talker: '?',
  },
]