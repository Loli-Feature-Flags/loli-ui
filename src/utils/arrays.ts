export function removeItemsFromArray<T>(array: T[], filter: T[]) {
  if (filter.length === 0) return array

  return array.filter((element) => !filter.includes(element))
}
