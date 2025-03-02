export function isDefined(val: unknown): boolean {
//   return val !== undefined && val !== null

  return Boolean(val)
}
