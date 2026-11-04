/**
 * @jest-environment node
 */
import { oracleWinners, resolverWinners } from "./helpers/cascade"
import { PARITY_CASES, StyleCaseProps } from "./helpers/styleCases"

// Runs against the output of `yarn compile` (see the `pretest:build` script).

// Prop orders that cascade differently in styled-system. Each needs a
// longhand written before a shorthand that resets part of it.
const KNOWN_DIFFERENCES: { props: StyleCaseProps; reason: string }[] = [
  {
    props: { borderWidth: 2, borderTop: "1px solid" },
    reason: "a later border-<side> resets one side of an earlier border-width",
  },
  {
    props: { borderColor: "mono10", borderBottom: "1px solid" },
    reason: "a later border-<side> resets one side of an earlier border-color",
  },
  {
    props: { border: "1px solid", borderColor: "mono10", borderTop: "none" },
    reason: "a later border-<side> resets one side of an earlier border-color",
  },
  {
    props: { mt: { _: 2 }, m: 1 },
    reason: "an object value makes styled-system sort keys alphabetically",
  },
  {
    props: { px: 2, p: 1, opacity: { _: 1 } },
    reason: "an object value makes styled-system sort keys alphabetically",
  },
  {
    props: { borderTop: "1px solid", borderColor: "mono10", opacity: { _: 1 } },
    reason: "an object value makes styled-system sort keys alphabetically",
  },
]

// The Task 6 review's cascade cases, minus the known differences above.
const CASCADE_CASES: StyleCaseProps[] = [
  { m: 2, mt: 1 },
  { mt: 1, m: 2 },
  { mx: 1, ml: [2, 4] },
  { m: { _: 1, md: 2 }, mt: 3 },
  { m: [1, null, 2], mt: 3 },
  { border: "1px solid", borderColor: "mono10" },
  { borderColor: "mono10", border: "1px solid" },
  { borderTop: "1px solid", borderWidth: 2 },
  { ml: 1, m: 2, mx: 4 },
  { marginTop: 2, m: 1, mt: 4 },
  { mt: [2, "31px"] },
  { mt: [2, 4], m: 1 },
  { borderRadius: 4, borderTopLeftRadius: 8 },
  { borderTopLeftRadius: 8, borderRadius: 4 },
  { borderTop: "1px solid", borderTopWidth: [null, 2], borderWidth: 3 },
  { m: [null, null, 4], mt: [null, 2] },
  { px: [1, null, 4], pl: [null, 2] },
  { p: 2, pt: 0 },
  { pt: 0, p: 2 },
  { borderBottom: "1px solid", borderColor: "mono10" },
  { borderBottomColor: "mono30", borderBottom: "1px solid" },
  { borderX: "1px solid", borderLeftColor: "red" },
  { m: "0 auto", mt: 2 },
  { mt: 2, m: "0 auto" },
  { color: ["mono60", "mono100"], bg: { md: "mono5" }, opacity: [1, 0.5] },
]

const label = (props: StyleCaseProps) => {
  return JSON.stringify(props)
}

const MATCHING_CASES = Object.values(
  Object.fromEntries(
    [...PARITY_CASES, ...CASCADE_CASES].map((props) => [label(props), props])
  )
)

describe("cascade winners", () => {
  describe.each(MATCHING_CASES.map((props) => [label(props), props]))(
    "%s",
    (_name, props) => {
      it("match styled-system at every breakpoint", () => {
        const expected = oracleWinners(props as StyleCaseProps)
        expect(resolverWinners(props as StyleCaseProps)).toEqual(expected)
      })
    }
  )

  describe.each(
    KNOWN_DIFFERENCES.map(({ props, reason }) => [label(props), reason, props])
  )("%s (known difference: %s)", (_name, _reason, props) => {
    it("still differs from styled-system", () => {
      const expected = oracleWinners(props as StyleCaseProps)
      expect(resolverWinners(props as StyleCaseProps)).not.toEqual(expected)
    })
  })
})
