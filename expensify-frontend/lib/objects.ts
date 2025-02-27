export const mergeIf = <T extends object>(
  predicate: boolean,
  defaultObject: T,
  objectToMerge: T
) => (predicate ? { ...defaultObject, ...objectToMerge } : defaultObject)

export type ConditionallyMergedObject<T extends object> = [boolean, T]

export const mergeManyIfs = <T extends object>(
  startingObject: T,
  conditionalObjects: ReadonlyArray<ConditionallyMergedObject<T>>
) => ({
  ...conditionalObjects.reduce(
    (acc, [predicate, objectToMerge]) => mergeIf(predicate, acc, objectToMerge),
    startingObject
  )
})
