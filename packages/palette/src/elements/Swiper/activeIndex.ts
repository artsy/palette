/**
 * Remaps the progress into the active index, given an array of `length`.
 * @param progress number from 1 to 100
 * @param length length of an array
 */
export const activeIndex = ({
  progress,
  length,
}: {
  progress: number
  length: number
}) => {
  return Math.round((progress * (length - 1)) / 100)
}
