# @artsy/palette

Artsy's Design System

## What is Palette?

Palette is a collection of primitive, product-agnostic elements that help encapsulate Artsy's look and feel at base level. This project is intended to be used
across our digital product portfolio.

Find out more at [github.com/artsy/palette](https://github.com/artsy/palette)

### ⚠️ Don't Forget About iOS!

When adding a new component to Palette, it's important to be aware that this library is used on the web as well as in React Native, via Emission, and therefore must follow a few rules in terms of structure, namely:

> Components exported from the main `/elements/index.tsx` must have a corresponding `.ios.tsx` file, even if the component isn't yet used in React Native.

Example:

```
/elements
  /MyComponent
    index.tsx
    MyComponent.tsx
    MyComponent.ios.tsx
```

And from within `/elements/index.tsx`, we export our component:

```tsx
export * from "./MyComponent"
```

When React Native imports `@artsy/palette`, it will automatically look for files with a `.ios` extension and import those first, and then secondarily import everything else. If a component contains web-only features but doesn't have a corresponding iOS file stub, React Native tooling will error out.
