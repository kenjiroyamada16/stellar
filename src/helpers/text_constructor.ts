export const handwriteText = async (text: string, element: HTMLElement): Promise<void> => {
  return new Promise<void>((resolve) => {
    element.textContent = '';

    const textCharacters = text.split('');

    for (let i = 0; i < textCharacters.length; i++) {
      const character = textCharacters[i];

      setTimeout(() => {
        if (character === '#') {
          element.textContent += '';
          return;
        }

        element.textContent += character;
        if (i == textCharacters.length - 1) resolve();
      }, i * 100);
    }
  })
}