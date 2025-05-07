import { type MaybeAccessor, access } from '@corvu/utils/reactivity'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import { untrack } from 'solid-js/web'

const createSvgSize = (props: {
  element: MaybeAccessor<SVGElement | null>
  dimension: MaybeAccessor<'width' | 'height'>
  onSizeChange?: (size: number) => void
  onCleanup?: () => void
}): Accessor<number | null> => {
  const [size, setSize] = createSignal<number | null>(null)

  createEffect(() => {
    const element = access(props.element)
    if (!element) return

    syncSize(element)

    const observer = new ResizeObserver(resizeObserverCallback)
    observer.observe(element)
    onCleanup(() => {
      observer.disconnect()
      props.onCleanup?.()
    })
  })

  const resizeObserverCallback = ([entry]: ResizeObserverEntry[]) => {
    syncSize(entry!.target)
  }

  const syncSize = (element: Element) => {
    const dimension = access(props.dimension)
    untrack(() => {
      const boundingClientRect = element.getBoundingClientRect()
      const newSize =
        dimension === 'width'
          ? boundingClientRect.width
          : boundingClientRect.height
      if (newSize === 0) return
      const sizeChanged = size() !== newSize
      if (!sizeChanged) return
      setSize(newSize)
      props.onSizeChange?.(newSize)
    })
  }

  return size
}

export default createSvgSize
