import type { ChartContextType } from '@src/components/context'
import { getBarPadding } from '@src/lib/utils'
import { scaleLinear } from 'd3-scale'
import { type Accessor, createMemo } from 'solid-js'

const createPoints = (props: {
  dataKey: Accessor<string | undefined>
  axisId: Accessor<string>
  stackId: Accessor<string | undefined>
  data: Accessor<number[]>
  chartContext: ChartContextType
}) => {
  return createMemo(() => {
    const data = props.data()

    const barPadding = getBarPadding(props.chartContext)
    const left = props.chartContext.getInset('left') + barPadding
    const right =
      props.chartContext.width() -
      props.chartContext.getInset('right') -
      barPadding
    const scaleWidth = scaleLinear([0, data.length - 1], [left, right])

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
    return data.map((value, dataIdx) => {
      let stackedValue = value

      if (stack) {
        const stackDataKeys = [...stack.keys()]
        const thisSeriesIdx = stackDataKeys.indexOf(props.dataKey() ?? '')

        if (thisSeriesIdx > 0) {
          for (let seriesIdx = 0; seriesIdx < thisSeriesIdx; seriesIdx++) {
            stackedValue +=
              stack.get(stackDataKeys[seriesIdx]!)?.values[dataIdx] || 0
          }
        }
      }

      return [scaleWidth(dataIdx), scaleHeight(stackedValue)] as [
        number,
        number,
      ]
    })
  })
}

export default createPoints
