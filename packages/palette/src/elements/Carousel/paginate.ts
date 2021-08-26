/**
 * Sums all values, building from the previous
 * @param xs list of values to compound
 */
export const compound = (xs: number[]): number[] => {
  // @ts-expect-error  MIGRATE_STRICT_MODE
  return xs.reduce((p, n) => p.concat((+p.slice(-1) || 0) + n), [])
}

/**
 * Build an array of offsets
 * @param viewport window width
 * @param values array of cell widths
 */
export const chunk = ({
  viewport,
  values,
}: {
  viewport: number
  values: number[]
}) => {
  return values.reduce(
    (acc, value) => {
      const prev = acc[acc.length - 1]
      if (prev + value <= viewport) {
        acc[acc.length - 1] += value
        return acc
      }
      return [...acc, value]
    },
    [0]
  )
}

/** Align last page to the left or right */
export type CarouselPaginationAlignment = "left" | "right"

/**
 * Creates an array of offsets based on the given viewport
 * @param viewport window width
 * @param values array of cell widths
 * @param alignment align last page to the left or right
 */
export const paginateCarousel = ({
  viewport,
  values,
  alignment = "right",
}: {
  viewport: number
  values: number[]
  alignment?: CarouselPaginationAlignment
}) => {
  const offsets = chunk({ viewport, values })

  // Only a single page — no need to paginate
  if (offsets.length === 1) {
    return [0]
  }

  // Last page align right
  if (alignment === "right") {
    const edges = compound(offsets)
    const head = edges.slice(0, -2)
    const tail = edges[edges.length - 1] - viewport
    return [0, ...head, tail]
  }

  // Last page align left
  const pages = compound(offsets).slice(0, -1)

  return [0, ...pages]
}
