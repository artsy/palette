/**
 * Calculate the percentage of the rail that has been scrolled.
 * If the left edge is at the total minus the viewport we are done scrolling.
 * @param viewport window width
 * @param total total width of the rail
 * @param left left edge of scroll
 */
export const percentage = ({
  viewport,
  total,
  left,
}: {
  viewport: number
  total: number
  left: number
}) => {
  return Math.floor((left / (total - viewport)) * 100)
}
