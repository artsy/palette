---
name: Component Spec
about: Propose additions or updates to palette
---

<!-- Title should be formatted as
  [NEW|UPDATE] Path / To / Component
-->

## Component Name

### Zeplin Links

web: <!-- https://zpl.io/aabbccd -->

### Product Team

<!-- Purchase/Sell/etc -->

### Design Lead

<!-- @person -->

<!-- optional
### Additional Info
 Add any additional information here that might not be covered by the spec. Remove if not needed.
-->

---

## Checklists

### Design

<!-- Keep the section (token/element/component) that is appropriate and delete the others -->

#### For Tokens

_*Color, type, spacing, icons, etc*_

- [ ] Is it serving a purpose? (is it needed or just purely decorative?)

- [ ] Can it be merged with any existing styles on the site?

- [ ] Has it been pressure-tested in all instances?

- [ ] Does it meet accessibility standards? (min type size, color contrast)

#### For Elements

_*Buttons, links, loaders, inputs, dropdowns, etc*_

- [ ] Is it using up-to-date tokens from above?

- [ ] Have all states been captured? (hover, selected, disabled, focused, normal, thinking, errors)

- [ ] Have all transitions/animations been defined?

- [ ] Is it useable? (Considering touch targets, screen sizes)

- [ ] Is it consistent with the rest of the visual system? (Corner radius, stroke weight, form, shadow, opacity, etc)

- [ ] Does it meet accessibility standards? (is it keyboard navigable, does it have required accessibility markup)

- [ ] Does it render and function properly in Artsy supported browsers?

#### For Components

_*Nav, modules, modals, cards, etc*_

- [ ] Is it using up-to-date elements **and** tokens from above?

- [ ] Does it communicate clearly? (Copy, writing style/tone)

- [ ] Is it flexible? (Internationalization, text wrapping)

- [ ] Is it logical from a UX perspective? Does it follow paradigms set on the rest of Artsy?

- [ ] Has responsive behavior at all breakpoints been defined?

- [ ] Have all transitions/animations been defined?

- [ ] Does it meet accessibility standards?

- [ ] Does it render and function properly in Artsy supported browsers?

### Engineering

#### Accessibility

- [ ] Do all images and multimedia have `alt` or `title` tags?

- [ ] Are semantic elements used appropriately (`nav`, `button`, etc)?

- [ ] Are new components keyboard-navigable?

- [ ] Are hover interactions available by other means?

- [ ] Are `aria-` attributes included where appropriate?

- [ ] Has a Chrome Devtools [accessibility audit](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#audits) been performed?

#### Compatibility

Has the new component been reviewed in [Browserstack](https://live.browserstack.com/dashboard):

- [ ] Desktop Chrome

- [ ] Desktop Edge

- [ ] Desktop Safari

- [ ] Desktop Firefox
