import type { OverrideProps } from '@src/lib/types'
import { pointDefined } from '@src/lib/utils'
import {
  type Area,
  type CurveFactory,
  type Line,
  area,
  curveLinear,
  line,
} from 'd3-shape'
import {
  type ComponentProps,
  createMemo,
  mergeProps,
  splitProps,
} from 'solid-js'

export type CurveProps = OverrideProps<
  Omit<ComponentProps<'path'>, 'd'>,
  {
    points: [number, number][]
    curve?: CurveFactory
    baseLine?: number | number[]
    connectNulls?: boolean
  }
>

const Curve = (props: CurveProps) => {
  const defaultedProps = mergeProps(
    {
      baseLine: null,
      curve: curveLinear,
      connectNulls: false,
    },
    props,
  )
  const [localProps, otherProps] = splitProps(defaultedProps, [
    'points',
    'curve',
    'baseLine',
    'connectNulls',
  ])

  const path = createMemo(() =>
    getPath(
      localProps.curve,
      localProps.points,
      localProps.baseLine,
      localProps.connectNulls,
    ),
  )

  return <path d={path() ?? undefined} {...otherProps} />
}

const getPath = (
  curve: CurveFactory,
  points: [number, number][],
  baseLine: number | number[] | null,
  connectNulls: boolean,
) => {
  if (connectNulls) {
    return createPathSegment(curve, points.filter(pointDefined), baseLine)
  }

  const segments: [number, number][][] = []
  let currentSegment: [number, number][] = []

  for (const point of points) {
    if (!pointDefined(point)) {
      if (currentSegment.length > 0) {
        segments.push(currentSegment)
        currentSegment = []
      }
    } else {
      currentSegment.push(point)
    }
  }

  if (currentSegment.length > 0) segments.push(currentSegment)

  const paths = segments.map((segment) =>
    createPathSegment(curve, segment, baseLine),
  )
  return paths.join(' ')
}

const createPathSegment = (
  curve: CurveFactory,
  points: [number, number][],
  baseLine: number | number[] | null,
) => {
  let lineFunction: Line<[number, number]> | Area<[number, number]>
  if (baseLine === null) {
    lineFunction = line().curve(curve)
  } else if (Array.isArray(baseLine)) {
    lineFunction = area()
      .curve(curve)
      .y0((_, i) => (baseLine[i] !== undefined ? baseLine[i]! : 0))
  } else {
    lineFunction = area().curve(curve).y0(baseLine)
  }

  return lineFunction(points)
}

export default Curve
