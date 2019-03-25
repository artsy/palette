import React from "react"
import renderer from "react-test-renderer"
import { themeProps } from "../../Theme"
import { Display, Sans, Serif, Text } from "../Typography"

class Catcher extends React.Component<{ onError: (error: Error) => void }> {
  componentDidCatch(error, _info) {
    this.props.onError(error)
  }
  render() {
    return this.props.children
  }
}

describe("Typography", () => {
  describe("Sans", () => {
    describe("concerning font-family", () => {
      it("uses regular by default", () => {
        const sans = renderer.create(<Sans size="3t">Hello world</Sans>).root
        const text = sans.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(
          themeProps.fontFamily.sans.regular
        )
      })

      it("uses medium", () => {
        const sans = renderer.create(
          <Sans weight="medium" size="3t">
            Hello world
          </Sans>
        ).root
        const text = sans.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(themeProps.fontFamily.sans.medium)
      })

      it("uses regular (default) italic", () => {
        const sans = renderer.create(
          <Sans italic size="3t">
            Hello world
          </Sans>
        ).root
        const text = sans.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(themeProps.fontFamily.sans.italic)
      })

      it("uses regular (explicit) italic", () => {
        const sans = renderer.create(
          <Sans weight="regular" italic size="3t">
            Hello world
          </Sans>
        ).root
        const text = sans.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(themeProps.fontFamily.sans.italic)
      })

      it("uses medium italic", () => {
        const sans = renderer.create(
          <Sans weight="medium" italic size="3t">
            Hello world
          </Sans>
        ).root
        const text = sans.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(
          themeProps.fontFamily.sans.mediumItalic
        )
      })
    })

    describe("concerning font-size & line-height", () => {
      it("supports a single size", () => {
        const sans = renderer.create(<Sans size="3">Hello world</Sans>).root
        const text = sans.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontSize).toEqual(
          `${themeProps.typeSizes.sans["3"].fontSize}px`
        )
        expect(text.props.lineHeight).toEqual(
          `${themeProps.typeSizes.sans["3"].lineHeight}px`
        )
      })

      it("supports multiple responsive sizes", () => {
        const sans = renderer.create(<Sans size={["2", "4"]}>Hello world</Sans>)
          .root
        const text = sans.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontSize).toEqual([
          `${themeProps.typeSizes.sans["2"].fontSize}px`,
          `${themeProps.typeSizes.sans["4"].fontSize}px`,
        ])
        expect(text.props.lineHeight).toEqual([
          `${themeProps.typeSizes.sans["2"].lineHeight}px`,
          `${themeProps.typeSizes.sans["4"].lineHeight}px`,
        ])
      })
    })
  })

  describe("Serif", () => {
    describe("concerning font-family", () => {
      it("uses regular by default", () => {
        const serif = renderer.create(<Serif size="3t">Hello world</Serif>).root
        const text = serif.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(
          themeProps.fontFamily.serif.regular
        )
      })

      it("uses semibold", () => {
        const serif = renderer.create(
          <Serif weight="semibold" size="3t">
            Hello world
          </Serif>
        ).root
        const text = serif.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(
          themeProps.fontFamily.serif.semibold
        )
      })

      it("uses regular (default) italic", () => {
        const serif = renderer.create(
          <Serif italic size="3t">
            Hello world
          </Serif>
        ).root
        const text = serif.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(
          themeProps.fontFamily.serif.italic
        )
      })

      it("uses regular (explicit) italic", () => {
        const serif = renderer.create(
          <Serif weight="regular" italic size="3t">
            Hello world
          </Serif>
        ).root
        const text = serif.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontFamily).toEqual(
          themeProps.fontFamily.serif.italic
        )
      })

      describe("with invalid options", () => {
        // https://github.com/facebook/react/issues/11098#issuecomment-370614347
        const _consoleError = console.error

        beforeEach(() => {
          console.error = jest.fn()
        })

        afterEach(() => {
          console.error = _consoleError
        })

        it("throws when trying to use semibold italic", done => {
          expect.assertions(1)
          renderer.create(
            <Catcher
              onError={error => {
                expect(error.message).toMatch(/italic.+semibold/)
                done()
              }}
            >
              <Serif weight="semibold" italic size="3t">
                Hello world
              </Serif>
            </Catcher>
          )
        })
      })
    })

    describe("concerning font-size & line-height", () => {
      it("supports a single size", () => {
        const serif = renderer.create(<Serif size="3">Hello world</Serif>).root
        const text = serif.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontSize).toEqual(
          `${themeProps.typeSizes.serif["3"].fontSize}px`
        )
        expect(text.props.lineHeight).toEqual(
          `${themeProps.typeSizes.serif["3"].lineHeight}px`
        )
      })

      it("supports multiple responsive sizes", () => {
        const serif = renderer.create(
          <Serif size={["2", "4"]}>Hello world</Serif>
        ).root
        const text = serif.findByType(Text as React.ComponentClass<any>)
        expect(text.props.fontSize).toEqual([
          `${themeProps.typeSizes.serif["2"].fontSize}px`,
          `${themeProps.typeSizes.serif["4"].fontSize}px`,
        ])
        expect(text.props.lineHeight).toEqual([
          `${themeProps.typeSizes.serif["2"].lineHeight}px`,
          `${themeProps.typeSizes.serif["4"].lineHeight}px`,
        ])
      })
    })

    describe("Display", () => {
      describe("concerning font-family", () => {
        it("uses regular by default", () => {
          const display = renderer.create(
            <Display size="3t">Hello world</Display>
          ).root
          const text = display.findByType(Text as React.ComponentClass<any>)
          expect(text.props.fontFamily).toEqual(
            themeProps.fontFamily.display.regular
          )
        })
      })
    })
  })
})
