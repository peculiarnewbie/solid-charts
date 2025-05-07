import { type MaybeAccessor, access } from '@corvu/utils/reactivity'
import {
  type Accessor,
  createEffect,
  createSignal,
  onCleanup,
  untrack,
} from 'solid-js'

const createSize = (props: {
  element: MaybeAccessor<HTMLElement | null>
}): Accessor<[number, number] | null> => {
  const [size, setSize] = createSignal<[number, number] | null>(null)

  createEffect(() => {
    const element = access(props.element)
    if (!element) return

    syncSize(element)

    const observer = new ResizeObserver(resizeObserverCallback)
    observer.observe(element)
    onCleanup(() => {
      observer.disconnect()
    })
  })

  const resizeObserverCallback = ([entry]: ResizeObserverEntry[]) => {
    syncSize(entry!.target)
  }

  const syncSize = (element: Element) => {
    untrack(() => {
      const newSize = [element.clientWidth, element.clientHeight]
      const currentSize = size()
      const sizeChanged =
        currentSize === null ||
        currentSize[0] !== newSize[0] ||
        currentSize[1] !== newSize[1]
      if (!sizeChanged) return
      setSize([element.clientWidth, element.clientHeight])
    })
  }

  return size
}

export default createSize
