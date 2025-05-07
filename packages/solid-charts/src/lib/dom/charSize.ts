import type { ComponentProps } from 'solid-js'
import { assign } from 'solid-js/web'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz '

const PROPS_IGNORELIST: (keyof Omit<ComponentProps<'text'>, 'x' | 'y'>)[] = [
  'fill',
  'text-anchor',
  'dominant-baseline',
  'dx',
  'dy',
]

type SizeCache = Map<string, { x: number; y: number }>

const sizeCache: SizeCache = new Map()

/**
 * Gets the average size of a character by creating a temporary, hidden text element
 * Uses the same properties as the label text element and inserts it under the same parent
 * @param parentRef The parent element
 * @param props The properties to assign to the text element
 * @returns x and y size of the average character
 * ```typescript
 * { x: number, y: number }
 * ```
 */
const getAverageCharSize = (
  parentRef: SVGElement,
  props: Omit<ComponentProps<'text'>, 'x' | 'y'>,
  axisId: string,
) => {
  const propsCopy = { ...props }
  for (const prop of PROPS_IGNORELIST) {
    delete propsCopy[prop]
  }

  const cacheKey = `${axisId}-${JSON.stringify(propsCopy)}`
  const cachedSize = sizeCache.get(cacheKey)
  if (cachedSize) return cachedSize

  const textElement = parentRef.ownerDocument.createElementNS(
    'http://www.w3.org/2000/svg',
    'text',
  )
  assign(textElement, propsCopy, true, true)
  textElement.textContent = ALPHABET
  textElement.style.visibility = 'hidden'
  parentRef.appendChild(textElement)
  const bbox = textElement.getBBox()
  parentRef.removeChild(textElement)
  const averageCharWidth = bbox.width / ALPHABET.length
  const size = { x: averageCharWidth, y: bbox.height }

  sizeCache.set(cacheKey, size)
  return size
}

export { getAverageCharSize }
