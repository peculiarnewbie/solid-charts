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

const values = [0, 3, 2, 5, 3, 6, 2]

const data = values.map((value, index) => ({
  xAxis: `Day ${index + 1}`,
  value,
}))

const FirstChart = () => {
  return (
    <div class="h-62.5 text-sm w-125 m-6">
      <Chart data={data}>
        <Axis axis="y" position="left" tickCount={4}>
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
        <Line dataKey="value" class="text-sc-300" stroke-width={4} />
        <Point
          dataKey="value"
          class="text-sc-400 stroke-sc-100"
          r={5}
          stroke-width={2}
        />
      </Chart>
    </div>
  )
}

export default FirstChart
