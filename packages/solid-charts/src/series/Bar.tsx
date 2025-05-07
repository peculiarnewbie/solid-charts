import { useChartContext } from '@src/components/context'
import createBands from '@src/lib/createBands'
import createBaseLine from '@src/lib/createBaseLine'
import createPoints from '@src/lib/createPoints'
import createSeries from '@src/lib/createSeries'
import type { OverrideProps } from '@src/lib/types'
import { accessData } from '@src/lib/utils'
import {
  type ComponentProps,
  For,
  createEffect,
  createMemo,
  createUniqueId,
  mergeProps,
  onCleanup,
  splitProps,
} from 'solid-js'

export type BarProps = OverrideProps<
  Omit<ComponentProps<'rect'>, 'x' | 'width' | 'y' | 'height'>,
  {
    /**
     * The key in the data object used to render the bar series. Don't provide a key if the data is a simple array of numbers.
     */
    dataKey?: string
    /**
     * The id of the y axis to use for the bar series.
     * @defaultValue '0'
     */
    axisId?: string
    /**
     * The id of the stack to use for the bar series.
     */
    stackId?: string
  }
>

/** Bar series component.
 *
 * @data `data-sc-bar-group` - Present on every bar group element.
 * @data `data-sc-bar` - Present on every bar rect element.
 */
const Bar = (props: BarProps) => {
  const seriesId = createUniqueId()

  const defaultedProps = mergeProps(
    {
      axisId: '0',
      fill: 'currentColor',
      stroke: 'none',
    },
    props,
  )

  const [localProps, otherProps] = splitProps(defaultedProps, [
    'dataKey',
    'axisId',
    'stackId',
  ])

  const chartContext = useChartContext()

  createEffect(() => {
    chartContext.registerBar(localProps.stackId ?? seriesId)
    onCleanup(() => chartContext.unregisterBar(localProps.stackId ?? seriesId))
  })

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

  const baseLine = createBaseLine({
    dataKey: () => localProps.dataKey,
    axisId: () => localProps.axisId,
    stackId: () => localProps.stackId,
    data,
    chartContext,
  })

  const bands = createBands({
    seriesId,
    stackId: () => localProps.stackId,
    data,
    chartContext,
  })

  const bars = () => {
    const _points = points()
    let _baseLine = baseLine()
    if (!Array.isArray(_baseLine)) {
      _baseLine = new Array(_points.length).fill(_baseLine)
    }
    const _bands = bands()
    return new Array(_points.length).fill(null).map((_, i) => {
      const y = _points[i]![1]
      const baseLine = _baseLine[i]!
      return {
        x: _bands[i]!.x,
        width: _bands[i]!.width,
        y: y > baseLine ? baseLine : y,
        height: y > baseLine ? y - baseLine : baseLine - y,
      }
    })
  }

  return (
    <g data-sc-bar-group="">
      <For each={bars()}>
        {(bar) => <rect {...bar} {...otherProps} data-sc-bar="" />}
      </For>
    </g>
  )
}

export default Bar
