export function useString() {
  function isStringInWord(str: string, word: string): boolean {
    return word.toUpperCase().includes(str.toUpperCase());
  }

  return {
    isStringInWord,
  };
}
