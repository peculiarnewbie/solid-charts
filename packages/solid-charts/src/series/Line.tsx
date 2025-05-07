import { useChartContext } from '@src/components/context'
import createPoints from '@src/lib/createPoints'
import createSeries from '@src/lib/createSeries'
import type { OverrideProps } from '@src/lib/types'
import { accessData } from '@src/lib/utils'
import Curve from '@src/shapes/Curve'
import type { CurveFactory } from 'd3-shape'
import {
  type ComponentProps,
  createMemo,
  createUniqueId,
  mergeProps,
  splitProps,
} from 'solid-js'

export type LineProps = OverrideProps<
  Omit<ComponentProps<'path'>, 'd'>,
  {
    /**
     * The key in the data object used to render the line series. Don't provide a key if the data is a simple array of numbers.
     */
    dataKey?: string
    /**
     * The id of the y axis to use for the line series.
     * @defaultValue '0'
     */
    axisId?: string
    /**
     * The id of the stack to use for the line series.
     */
    stackId?: string
    /**
     * The curve function used to render the line series path.
     */
    curve?: CurveFactory
    /**
     * Whether to connect null values in the line series path.
     */
    connectNulls?: boolean
  }
>

/** Line series component.
 *
 * @data `data-sc-line` - Present on every line path element.
 */
const Line = (props: LineProps) => {
  const seriesId = createUniqueId()

  const defaultedProps = mergeProps(
    {
      axisId: '0',
      stroke: 'currentColor',
      fill: 'none',
    },
    props,
  )

  const [localProps, otherProps] = splitProps(defaultedProps, [
    'dataKey',
    'axisId',
    'stackId',
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

  return <Curve points={points()} data-sc-line="" {...otherProps} />
}

export default Line
