function propsToString(obj: Record<any, any>) {
  return Object.keys(obj).reduce(
    (a, k: string) => {
      a[k] = `${obj[k]}`
      return a
    },
    {} as Record<string, any>
  )
}
export function serializeObj(obj: Record<any, any>) {
  return new URLSearchParams(propsToString(obj))
}
