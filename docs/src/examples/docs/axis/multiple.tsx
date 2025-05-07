import { Axis, AxisGrid, AxisLabel, AxisLine, Chart, Line } from 'solid-charts'

const lower = [0, 3, 2, 5, 3, 6, 2]
const middle = [28, 20, 39, 21, 27, 37, 25]
const high = [514, 421, 536, 518, 412, 455, 572]

const data = lower.map((lower, index) => ({
  xAxis: `Day ${index + 1}`,
  lower,
  middle: middle[index],
  higher: high[index],
}))

const MultipleAxisChart = () => {
  return (
    <div class="h-62.5 text-sm w-125 m-6">
      <Chart data={data}>
        <Axis axis="y" position="left">
          <AxisLabel />
          <AxisGrid class="opacity-20" />
        </Axis>
        <Axis axis="y" position="right" axisId="high" axisRange={[400, 600]}>
          <AxisLabel class="text-sc-400" />
        </Axis>
        <Axis axis="x" position="bottom" dataKey="xAxis">
          <AxisLabel />
          <AxisLine />
        </Axis>
        <Line dataKey="lower" stroke-width={3} />
        <Line dataKey="middle" stroke-width={3} />
        <Line
          dataKey="higher"
          axisId="high"
          class="stroke-sc-400"
          stroke-width={3}
        />
      </Chart>
    </div>
  )
}

export default MultipleAxisChart
