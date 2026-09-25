import React from "react"
import ReactDOM from "react-dom"
import { renderToString } from "react-dom/server"
import { act } from "react-dom/test-utils"
import { Image, ImageProps } from "./Image"

describe("Image", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container)
    container.remove()
    jest.restoreAllMocks()
  })

  const render = async (element: React.ReactElement) => {
    await act(async () => {
      ReactDOM.render(element, container)
    })
    return container.querySelector("img") as HTMLImageElement
  }

  const hydrate = async (element: React.ReactElement) => {
    await act(async () => {
      ReactDOM.hydrate(element, container)
    })
    return container.querySelector("img") as HTMLImageElement
  }

  const dispatch = (img: HTMLImageElement, type: "load" | "error") => {
    act(() => {
      img.dispatchEvent(new Event(type))
    })
  }

  /**
   * Server-renders the image, settles the `<img>` the way a browser would
   * before hydration, then hydrates.
   */
  const hydrateSettledImage = (
    props: ImageProps,
    {
      naturalWidth,
      decode,
    }: { naturalWidth: number; decode?: () => Promise<void> }
  ) => {
    container.innerHTML = renderToString(<Image {...props} />)

    const img = container.querySelector("img") as HTMLImageElement
    Object.defineProperty(img, "complete", { value: true })
    Object.defineProperty(img, "naturalWidth", { value: naturalWidth })
    if (decode) Object.defineProperty(img, "decode", { value: decode })

    return hydrate(<Image {...props} />)
  }

  describe("when the image fails before hydration", () => {
    // A broken image has no natural width and cannot be decoded
    const broken = {
      naturalWidth: 0,
      decode: () => Promise.reject(new Error("EncodingError")),
    }

    it("calls onError and hides the image", async () => {
      const onError = jest.fn()
      const onLoad = jest.fn()

      const img = await hydrateSettledImage(
        { src: "broken.jpg", alt: "", onError, onLoad },
        broken
      )

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onLoad).not.toHaveBeenCalled()
      expect(img.style.opacity).toBe("0")
      expect(img.getAttribute("aria-hidden")).toBe("true")
    })

    it("keeps a lazy-loaded image hidden", async () => {
      const onError = jest.fn()

      const img = await hydrateSettledImage(
        { src: "broken.jpg", alt: "", lazyLoad: true, onError },
        broken
      )

      expect(onError).toHaveBeenCalledTimes(1)
      expect(img.style.opacity).toBe("0")
    })
  })

  describe("when the image loads before hydration", () => {
    it("calls onLoad and shows a lazy-loaded image", async () => {
      const onError = jest.fn()
      const onLoad = jest.fn()

      const img = await hydrateSettledImage(
        { src: "image.jpg", alt: "", lazyLoad: true, onError, onLoad },
        { naturalWidth: 100 }
      )

      expect(onLoad).toHaveBeenCalledTimes(1)
      expect(onError).not.toHaveBeenCalled()
      expect(img.style.opacity).toBe("1")
    })

    it("treats a decodable image without intrinsic dimensions as loaded", async () => {
      const onError = jest.fn()
      const onLoad = jest.fn()

      const img = await hydrateSettledImage(
        { src: "image.svg", alt: "", lazyLoad: true, onError, onLoad },
        { naturalWidth: 0, decode: () => Promise.resolve() }
      )

      expect(onLoad).toHaveBeenCalledTimes(1)
      expect(onError).not.toHaveBeenCalled()
      expect(img.style.opacity).toBe("1")
    })

    it("does not replay an event for an image that unmounted mid-decode", async () => {
      const onLoad = jest.fn()
      let resolveDecode: () => void = () => undefined

      await hydrateSettledImage(
        { src: "image.svg", alt: "", onLoad },
        {
          naturalWidth: 0,
          decode: () => new Promise((resolve) => (resolveDecode = resolve)),
        }
      )

      ReactDOM.unmountComponentAtNode(container)

      await act(async () => {
        resolveDecode()
      })

      expect(onLoad).not.toHaveBeenCalled()
    })
  })

  describe("when rendered on the client", () => {
    it("reports a cached image's load once, even though the browser also fires load", async () => {
      // A cached source is `complete` as soon as `src` is set, but the browser
      // still dispatches its `load` event afterwards
      jest
        .spyOn(HTMLImageElement.prototype, "complete", "get")
        .mockReturnValue(true)
      jest
        .spyOn(HTMLImageElement.prototype, "naturalWidth", "get")
        .mockReturnValue(100)
      const onLoad = jest.fn()

      const img = await render(
        <Image src="cached.jpg" alt="" lazyLoad onLoad={onLoad} />
      )
      expect(onLoad).toHaveBeenCalledTimes(1)
      expect(img.style.opacity).toBe("1")

      dispatch(img, "load")

      expect(onLoad).toHaveBeenCalledTimes(1)
    })

    it("reports a cached image's load once, even if the browser fires load before effects run", async () => {
      jest
        .spyOn(HTMLImageElement.prototype, "complete", "get")
        .mockReturnValue(true)
      jest
        .spyOn(HTMLImageElement.prototype, "naturalWidth", "get")
        .mockReturnValue(100)
      const onLoad = jest.fn()

      await act(async () => {
        ReactDOM.render(
          <Image src="cached.jpg" alt="" onLoad={onLoad} />,
          container
        )
        // The commit has happened, but passive effects haven't flushed yet
        container.querySelector("img")?.dispatchEvent(new Event("load"))
      })

      expect(onLoad).toHaveBeenCalledTimes(1)
    })

    it("hides the image when it fails", async () => {
      const onError = jest.fn()

      const img = await render(
        <Image src="broken.jpg" alt="" onError={onError} />
      )

      dispatch(img, "error")

      expect(onError).toHaveBeenCalledTimes(1)
      expect(img.style.opacity).toBe("0")
      expect(img.getAttribute("aria-hidden")).toBe("true")
    })

    it("settles again when the source changes", async () => {
      const onError = jest.fn()
      const onLoad = jest.fn()

      const img = await render(
        <Image src="broken.jpg" alt="" onError={onError} onLoad={onLoad} />
      )
      dispatch(img, "error")
      expect(img.style.opacity).toBe("0")

      await render(
        <Image src="fixed.jpg" alt="" onError={onError} onLoad={onLoad} />
      )
      dispatch(img, "load")

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onLoad).toHaveBeenCalledTimes(1)
      expect(img.style.opacity).toBe("")
      expect(img.hasAttribute("aria-hidden")).toBe(false)
    })
  })
})
