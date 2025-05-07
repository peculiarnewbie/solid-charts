import type { ChartContextType } from '@src/components/context'
import { scaleLinear } from 'd3-scale'
import { type Accessor, createMemo } from 'solid-js'

/**
 * Calculates the baseline coordinates based on the axis and stack that the series belongs to.
 */
const createBaseLine = (props: {
  dataKey: Accessor<string | undefined>
  axisId: Accessor<string>
  stackId: Accessor<string | undefined>
  data: Accessor<number[]>
  chartContext: ChartContextType
}) => {
  return createMemo(() => {
    const top = props.chartContext.getInset('top')
    const bottom =
      props.chartContext.height() - props.chartContext.getInset('bottom')

    const axis = props.chartContext.getAxis(props.axisId())
    let domainMin = axis.min
    if (!axis.userDefined) {
      domainMin = Math.min(axis.min, 0)
    }
    let scaleHeight = scaleLinear([domainMin, axis.max], [bottom, top])
    if (!axis.userDefined) {
      scaleHeight = scaleHeight.nice()
    }

    const stackId = props.stackId()
    const stack =
      stackId !== undefined && props.chartContext.stacks().get(stackId)

    if (!stack) return scaleHeight(0)

    const stackDataKeys = [...stack.keys()]
    const thisSeriesIdx = stackDataKeys.indexOf(props.dataKey() ?? '')

    if (thisSeriesIdx <= 0) return scaleHeight(0)

    return Array(props.data().length)
      .fill(null)
      .map((_, dataIdx) => {
        let baseLine = 0

        for (let seriesIdx = 0; seriesIdx < thisSeriesIdx; seriesIdx++) {
          baseLine += stack.get(stackDataKeys[seriesIdx]!)?.values[dataIdx] ?? 0
        }

        return scaleHeight(baseLine)
      })
  })
}

export default createBaseLine
