/**
 * Converts a string to camelCase
 * @param str String to convert
 * @returns String converted to camelCase
 * @example
 * toCamelCase('foo_bar') // returns 'fooBar'
 */
function toCamelCase(str: string): string {
  return str.replace(/_([a-z0-9])/g, (match, char) => char.toUpperCase())
}

/**
 * Checks if a value is a Record
 * @param value Value to check
 * @returns True if the value is a Record, false otherwise
 * @example
 * isRecord({ foo: 'bar' }) // returns true
 * isRecord(['foo', 'bar']) // returns false
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Converts all keys in an object to camelCase
 * @param input Object to convert
 * @returns Object with all keys converted to camelCase
 * @example
 * convertKeysToCamelCase({ foo_bar: 'baz' }) // returns { fooBar: 'baz' }
 * convertKeysToCamelCase({ foo_bar: { bar_baz: 'qux' } }) // returns { fooBar: { barBaz: 'qux' } }
 */
export function convertKeysToCamelCase<T>(
  input: Record<string, unknown> | Array<Record<string, unknown>>
): T {
  const result: Record<string, unknown> = {}

  if (Array.isArray(input)) {
    return input.map(convertKeysToCamelCase) as unknown as T
  }

  Object.keys(input).forEach((key) => {
    const camelCaseKey = toCamelCase(key)
    const value = input[key]

    if (isRecord(value)) {
      result[camelCaseKey] = convertKeysToCamelCase(value)
    } else if (Array.isArray(value)) {
      result[camelCaseKey] = value.map((item) =>
        isRecord(item) ? convertKeysToCamelCase(item) : item
      )
    } else {
      result[camelCaseKey] = value
    }
  })

  return result as T
}
