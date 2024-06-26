import { RawFileIcons, FileIcon, Patterns } from '../../models';

/**
 * Maps the patterns to an array of strings.
 * Each pattern is a function that generates file names based on a key.
 *
 * @param patterns The patterns to map.
 * @returns An array of strings generated by applying the patterns.
 */
const mapPatterns = (patterns: Patterns): string[] => {
  return Object.entries(patterns).flatMap(([fileName, pattern]) =>
    pattern(fileName)
  );
};

/**
 * Parses the raw file icons by applying the patterns.
 * A pattern helps to generate file names based on a key.
 *
 * @param rawFileIcons - The list of file icons without applied patterns.
 * @returns The list of file icons with applied patterns.
 */
export const parseByPattern = (rawFileIcons: RawFileIcons): FileIcon[] => {
  return rawFileIcons.map(({ patterns, fileNames = [], ...rest }) => ({
    ...rest,
    fileNames: patterns ? [...mapPatterns(patterns), ...fileNames] : fileNames,
  }));
};
