export const stringIncludesCaseInsensitive = (
  string: string,
  subString: string,
  { caseSensitive }: { caseSensitive?: boolean } = { caseSensitive: false },
): boolean =>
  caseSensitive
    ? string.includes(subString)
    : string.toLowerCase().includes(subString.toLowerCase())

export const stringIncludes = stringIncludesCaseInsensitive
