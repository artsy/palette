# Palette Storybook Accessibility Audit Report

**Date:** 2026-02-09
**Tool:** pa11y (v9.1.0) with WCAG2AA standard (HTML CodeSniffer runner)
**Target:** Storybook at `http://localhost:6006/`
**Components Audited:** 71

---

## Executive Summary

| Metric | Count |
|---|---|
| Total components audited | 71 |
| Components with issues (beyond Storybook shell) | 11 |
| Components passing | 60 |
| Unique issue types found | 6 |

---

## Global Issue (Storybook Shell)

All 71 components report the following issue from Storybook's iframe shell, **not from the components themselves**. This can be safely filtered out:

| Code | Message |
|---|---|
| `WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2` | Empty `<h1 id="error-message"></h1>` heading tag in Storybook's error display placeholder |

---

## Components With Accessibility Issues

### 1. Banner

**Severity:** Error
**Issues:** 1

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `4_1_2.H91.Button.Name` | Dismiss button has no accessible name. Missing `aria-label`, `title`, or text content. | `<button>` (dismiss icon button) |

**Fix:** Add `aria-label="Dismiss"` to the Banner's close/dismiss button.

---

### 2. Breadcrumbs

**Severity:** Error
**Issues:** 4

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1-4 | `2_4_1.G1,G123,G124.NoSuchID` | Links point to named anchors (`#1`, `#2`, `#3`, `#4`) that don't exist in the document | `<a href="#1">Level 01</a>` etc. |

**Note:** This is likely a story-specific issue (demo links using `#1`, `#2`, etc. as href values). May not affect production usage.

---

### 3. CSSGrid (Responsive Grid story)

**Severity:** Error
**Issues:** 8

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1-8 | `1_1_1.H37` | `<img>` elements missing `alt` attribute | 8x `<img src="https://picsum.photos/...">` |

**Fix:** Ensure the `Image` component always renders an `alt` attribute. If decorative, use `alt=""`.

---

### 4. FilterSelect

**Severity:** Error
**Issues:** 2

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `4_1_2.H91.InputText.Name` | Search input has no accessible name | `<input placeholder="Filter by artist name" role="search">` |
| 2 | `1_3_1.F68` | Form field not labelled | Same element |

**Fix:** Add `aria-label="Filter by artist name"` or associate a `<label>` element with the input.

---

### 5. Input (Basic story)

**Severity:** Error
**Issues:** 2

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `4_1_2.H91.InputText.Name` | Text input has no accessible name | `<input placeholder="Enter text here">` |
| 2 | `1_3_1.F68` | Form field not labelled | Same element |

**Fix:** Add `aria-label` or associate a `<label>` element. The "with-title" story variant may already handle this correctly.

---

### 6. LabeledInput

**Severity:** Error
**Issues:** 2

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `4_1_2.H91.InputText.Name` | Text input has no accessible name | `<input placeholder="Enter amount">` |
| 2 | `1_3_1.F68` | Form field not labelled | Same element |

**Fix:** Ensure the `<label>` element is properly associated with the input via `htmlFor`/`id`.

---

### 7. PasswordInput

**Severity:** Error
**Issues:** 3

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `4_1_2.H91.InputPassword.Name` | Password input has no accessible name | `<input type="password" placeholder="Password">` |
| 2 | `1_3_1.F68` | Form field not labelled | Same element |
| 3 | `4_1_2.H91.Button.Name` | Show/hide password toggle button has no accessible name | `<button>` (eye icon) |

**Fix:**
- Add `aria-label="Password"` or a `<label>` to the password input
- Add `aria-label="Toggle password visibility"` to the toggle button

---

### 8. Select

**Severity:** Error
**Issues:** 2

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `4_1_2.H91.Select.Name` | Select element has no accessible name | `<select>` with "Please select" option |
| 2 | `1_3_1.F68` | Form field not labelled | Same element |

**Fix:** Add `aria-label` or associate a `<label>` element with the select.

---

### 9. SelectInput

**Severity:** Error
**Issues:** 2

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `1_3_5.H98` | Invalid `autocomplete` value: `tel-national` on non-text control group | `<input type="tel" autocomplete="tel-national">` |
| 2 | `4_1_2.H91.InputTel.Name` | Tel input has no accessible name | Same element |

**Fix:**
- Review the `autocomplete` attribute value for validity
- Add `aria-label` or a `<label>` element

---

### 10. TextArea

**Severity:** Error
**Issues:** 2

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `4_1_2.H91.Textarea.Name` | Textarea has no accessible name | `<textarea placeholder="Start typing...">` |
| 2 | `1_3_1.F68` | Form field not labelled | Same element |

**Fix:** Add `aria-label="Start typing"` or associate a `<label>` element.

---

### 11. ModalDialogContent (Form inputs)

**Severity:** Error
**Issues:** 4

| # | WCAG Code | Issue | Element |
|---|---|---|---|
| 1 | `1_3_5.H98` | Invalid `autocomplete` value: `name` on non-text control group | `<input placeholder="Enter your name" autocomplete="name">` |
| 2 | `4_1_2.H91.InputText.Name` | Name input has no accessible name | Same element |
| 3 | `1_3_1.F68` | Name form field not labelled | Same element |
| 4 | `4_1_2.H91.InputEmail.Name` | Email input has no accessible name | `<input type="email" placeholder="Enter your email" autocomplete="email">` |

**Fix:** Add `<label>` elements or `aria-label` attributes to all form inputs within modals.

---

## Components Passing (No Component-Level Issues)

The following 60 components had no accessibility issues beyond the global Storybook shell issue:

| Component | Status | Component | Status |
|---|---|---|---|
| AutocompleteInput | PASS | Marquee | PASS |
| Avatar | PASS | Message | PASS |
| BaseTabs | PASS | ModalDialog | PASS |
| BorderedRadio | PASS | MultiSelect | PASS |
| Box | PASS | Pagination | PASS |
| Button | PASS | Pill | PASS |
| Cards | PASS | Popover | PASS |
| Carousel | PASS | ProgressBar | PASS |
| CarouselBar | PASS | ProgressDots | PASS |
| Check | PASS | Radio | PASS |
| Checkbox | PASS | RadioGroup | PASS |
| Clickable | PASS | Range | PASS |
| Drawer | PASS | ReadMore | PASS |
| Dropdown | PASS | ResponsiveBox | PASS |
| EntityHeader | PASS | SelectInputList | PASS |
| Expandable | PASS | Separator | PASS |
| FullBleed | PASS | Shelf | PASS |
| GridColumns | PASS | ShowMore | PASS |
| HTML | PASS | Skeleton | PASS |
| HorizontalOverflow | PASS | Skip | PASS |
| Image | PASS | Spacer | PASS |
| Join | PASS | Spinner | PASS |
| Label | PASS | Stack | PASS |
| StackableBorderBox | PASS | Stepper | PASS |
| Sup | PASS | Swiper | PASS |
| Tabs | PASS | Text | PASS |
| Toast | PASS | Toasts | PASS |
| Toggle | PASS | Tooltip | PASS |
| BarChart | PASS | DonutChart | PASS |
| LineChart | PASS | | |

---

## Issue Categories Summary

### 1. Missing Accessible Names on Form Controls (Most Common)
**Affects:** Input, LabeledInput, FilterSelect, PasswordInput, Select, SelectInput, TextArea, ModalBase
**WCAG:** 4.1.2 (Name, Role, Value) + 1.3.1 (Info and Relationships)
**Root Cause:** Form elements using only `placeholder` without `<label>`, `aria-label`, or `aria-labelledby`
**Recommended Fix:** Ensure all form inputs have proper label associations. Consider adding default `aria-label` fallbacks in base input components.

### 2. Buttons Without Accessible Names
**Affects:** Banner (dismiss), PasswordInput (toggle visibility)
**WCAG:** 4.1.2 (Name, Role, Value)
**Root Cause:** Icon-only buttons without text content or ARIA labels
**Recommended Fix:** Add `aria-label` to all icon-only buttons.

### 3. Images Without Alt Attributes
**Affects:** CSSGrid (story-level, uses Image component)
**WCAG:** 1.1.1 (Non-text Content)
**Root Cause:** `<img>` elements rendered without `alt` attribute
**Recommended Fix:** Make `alt` a required prop or default to `alt=""` for decorative images.

### 4. Invalid Autocomplete Values
**Affects:** SelectInput, ModalBase
**WCAG:** 1.3.5 (Identify Input Purpose)
**Root Cause:** `autocomplete` attribute values that don't match the input's control group
**Recommended Fix:** Verify autocomplete values match the WHATWG specification for the input type.

### 5. Broken Internal Links
**Affects:** Breadcrumbs (story-level only)
**WCAG:** 2.4.1 (Bypass Blocks)
**Root Cause:** Demo href values (`#1`, `#2`) pointing to nonexistent anchors
**Note:** Story-specific, not a component bug.

---

## Recommendations

1. **High Priority:** Fix missing accessible names on all form controls (Input, Select, TextArea, etc.) - this affects 8 components
2. **High Priority:** Add `aria-label` to icon-only buttons (Banner dismiss, PasswordInput toggle)
3. **Medium Priority:** Ensure Image component enforces `alt` attribute (or defaults to `alt=""`)
4. **Low Priority:** Review autocomplete attribute values for standards compliance
5. **Storybook:** Consider fixing the empty `<h1 id="error-message">` in Storybook's preview template to clean up audit noise
