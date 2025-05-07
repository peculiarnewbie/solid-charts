import { useChartContext } from '@src/components/context'
import createBaseLine from '@src/lib/createBaseLine'
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

export type AreaProps = OverrideProps<
  Omit<ComponentProps<'path'>, 'd'>,
  {
    /**
     * The key in the data object used to render the area series. Don't provide a key if the data is a simple array of numbers.
     */
    dataKey?: string
    /**
     * The id of the y axis to use for the area series.
     * @defaultValue '0'
     */
    axisId?: string
    /**
     * The id of the stack to use for the area series.
     */
    stackId?: string
    /**
     * The curve function used to render the area series path.
     */
    curve?: CurveFactory
    /**
     * Whether to connect null values in the area series path.
     */
    connectNulls?: boolean
  }
>

/** Area series component.
 *
 * @data `data-sc-area` - Present on every area path element.
 */
const Area = (props: AreaProps) => {
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

  return (
    <Curve
      points={points()}
      baseLine={baseLine()}
      data-sc-area=""
      {...otherProps}
    />
  )
}

export default Area
