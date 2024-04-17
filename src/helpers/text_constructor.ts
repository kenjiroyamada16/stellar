export const handwriteText = async (text: string, element: HTMLElement): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    element.textContent = '';

    const textCharacters = text.split('');

    for (let i = 0; i < textCharacters.length; i++) {
      const character = textCharacters[i];

      setTimeout(() => {
        if (character === '%') {
          resolve(true);
          return;
        }

        if (character === '#') {
          element.textContent += '';
          return;
        }

        if (character === '@') {
          element.textContent += '\r\n';
          return;
        }

        element.textContent += character;
        if (i == textCharacters.length - 1) resolve(false);
      }, i * 100);
    }
  })
}