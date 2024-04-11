export const handwriteText= (text: string, element: HTMLElement) => {
  element.textContent = '';

  const textCharacters = text.split('');

  for (let i = 0; i < textCharacters.length; i++) {
    setTimeout(() => {
      element.textContent += textCharacters[i];
    }, i * 100);
  }
}