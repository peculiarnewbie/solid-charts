import { dataIf } from '@corvu/utils'
import { useChartContext } from '@src/components/context'
import createClosestTick from '@src/lib/createClosestTick'
import createPoints from '@src/lib/createPoints'
import createSeries from '@src/lib/createSeries'
import type { OverrideProps } from '@src/lib/types'
import { accessData, pointDefined } from '@src/lib/utils'
import {
  type ComponentProps,
  For,
  createMemo,
  createUniqueId,
  mergeProps,
  splitProps,
} from 'solid-js'

export type PointProps = OverrideProps<
  Omit<ComponentProps<'circle'>, 'cx' | 'cy'>,
  {
    /**
     * The key in the data object used to render the point series. Don't provide a key if the data is a simple array of numbers.
     */
    dataKey?: string
    /**
     * The id of the y axis to use for the point series.
     * @defaultValue '0'
     */
    axisId?: string
    /**
     * The id of the stack to use for the point series.
     */
    stackId?: string
    /**
     * `<circle>` element props to apply when the point is active.
     */
    activeProps?: Omit<ComponentProps<'circle'>, 'cx' | 'cy'>
  }
>

/** Point series component.
 *
 * @data `data-sc-point-group` - Present on every point group element.
 * @data `data-sc-point` - Present on every point circle element.
 */
const Point = (props: PointProps) => {
  const seriesId = createUniqueId()

  const defaultedProps = mergeProps(
    {
      axisId: '0',
      r: 4,
      fill: 'currentColor',
    },
    props,
  )

  const [localProps, otherProps] = splitProps(defaultedProps, [
    'dataKey',
    'axisId',
    'stackId',
    'activeProps',
  ])

  const chartContext = useChartContext()

  const data = createMemo(() =>
    accessData<number>(chartContext.data(), localProps.dataKey),
  )

  createSeries({
    seriesId,
    dataKey: () => localProps.dataKey,
    axisId: () => localProps.axisId,
    stackId: () => localProps.stackId,
    data,
    chartContext,
  })

  const points = createPoints({
    dataKey: () => localProps.dataKey,
    axisId: () => localProps.axisId,
    stackId: () => localProps.stackId,
    data,
    chartContext,
  })

  const closestTick = createClosestTick({
    axis: () => 'x',
    chartContext,
  })

  const isActive = (index: number) =>
    chartContext.pointerInChart() && closestTick()?.index === index

  const circleProps = (index: number) => {
    if (!isActive(index)) return otherProps
    return mergeProps(otherProps, localProps.activeProps)
  }

  return (
    <g data-sc-point-group="">
      <For each={points().filter(pointDefined)}>
        {(point, index) => (
          <circle
            cx={point[0]}
            cy={point[1]}
            data-active={dataIf(isActive(index()))}
            data-sc-point=""
            {...circleProps(index())}
          />
        )}
      </For>
    </g>
  )
}

export default Point
