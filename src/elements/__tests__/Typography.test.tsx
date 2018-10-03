import { Display, Sans, Serif, Text } from "elements/Typography"
import React from "react"
import renderer from "react-test-renderer"
import { themeProps } from "Theme"

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
