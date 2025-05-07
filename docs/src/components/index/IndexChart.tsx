import {
  Axis,
  AxisCursor,
  AxisGrid,
  AxisLabel,
  AxisLine,
  AxisTooltip,
  Chart,
  Line,
  Point,
} from 'solid-charts'
import { curveNatural } from 'solid-charts/curves'

const values = [23, 66, 45, 32, 64, 74, 100]

const data = Array.from({ length: 7 }, (_, i) => ({
  xAxis: `Day ${i + 1}`,
  value: values[i],
}))

const IndexChart = () => {
  return (
    <div class="bg-sc-bg px-3 py-5 md:px-5 max-w-140 mt-10 w-full select-none">
      <Chart data={data} width={520} height={260}>
        <Axis axis="y" position="left">
          <AxisLabel />
          <AxisGrid class="stroke-sc-text/20" />
        </Axis>
        <Axis dataKey="xAxis" axis="x" position="bottom">
          <AxisLabel />
          <AxisLine class="stroke-sc-text" />
          <AxisCursor
            stroke-dasharray="10,10"
            stroke-width={2}
            class="stroke-sc-text/70 transition-opacity"
          />
          <AxisTooltip class="rounded-md text-xs overflow-hidden shadow-lg border border-sc-200 bg-sc-bg">
            {(props) => (
              <>
                <div class="bg-sc-100 border-b border-sc-200 px-2 py-1 font-medium">
                  <p>{props.data.xAxis}</p>
                </div>
                <div class="flex items-center px-2 py-1">
                  <div class="rounded-full size-2 bg-sc-400" />
                  <p class="grow ml-1.5">Value</p>
                  <p class="ml-3">{props.data.value}</p>
                </div>
              </>
            )}
          </AxisTooltip>
        </Axis>
        <Line
          curve={curveNatural}
          dataKey="value"
          class="text-sc-300"
          stroke-width={5}
        />
        <Point
          dataKey="value"
          class="text-sc-400 transition-all"
          r={6}
          activeProps={{ r: 8 }}
        />
      </Chart>
    </div>
  )
}

export default IndexChart
