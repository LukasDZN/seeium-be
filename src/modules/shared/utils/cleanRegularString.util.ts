import { sharedUtils } from './shared.utils.js'

/**
 * Trim, remove multiple white spaces, remove non-alphanumeric characters and
 * convert to lowercase.
 */
export const cleanRegularString = (string: string): string => {
  string = string.trim()
  string = string.normalize('NFD').replace(/\p{Diacritic}/gu, '')
  string = sharedUtils.keepOnlyWordsAndSpacesFromString(string)
  string = sharedUtils.replaceMultipleWhiteSpacesWithSingle(string)
  string = string.trim()
  string = string.toLowerCase()

  return string
}
