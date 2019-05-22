/**
 * Given an array of numbers or objects returns the max value
 * @param values array of numbers or objects
 * @param accessor (optional) when passing an array of objects this function
 * specifies which attribute of object to be used for comparison. default is a unity function
 */
export const maxInArray = (
  values: any[],
  accessor: (item: any) => number = item => item
): number =>
  values.reduce((currentMax: number, item: any): number => {
    const value: number = accessor(item)
    return value > currentMax ? value : currentMax
  }, -Infinity) as number
