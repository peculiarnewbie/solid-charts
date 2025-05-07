import { Axis, AxisGrid, AxisLabel, AxisLine, Chart, Line } from 'solid-charts'

const data = [
  {
    line1: 0,
    line2: 7,
    xAxis: 'Day 1',
  },
  {
    line1: 3,
    line2: 5,
    xAxis: 'Day 2',
  },
  // truncate-start
  {
    line1: 2,
    line2: 6,
    xAxis: 'Day 3',
  },
  {
    line1: 5,
    line2: 3,
    xAxis: 'Day 4',
  },
  {
    line1: 3,
    line2: 2,
    xAxis: 'Day 5',
  },
  {
    line1: 6,
    line2: 2,
    xAxis: 'Day 6',
  },
  {
    line1: 8,
    line2: 4,
    xAxis: 'Day 7',
  },
  // truncate-end
]

const ObjectDataChart = () => {
  return (
    <div class="h-37.5 w-125">
      <Chart data={data}>
        <Axis axis="y" position="left">
          <AxisLabel />
          <AxisGrid class="opacity-20" />
        </Axis>
        <Axis axis="x" position="bottom" dataKey="xAxis">
          <AxisLabel />
          <AxisLine />
        </Axis>
        <Line dataKey="line1" stroke-width={3} class="stroke-sc-400" />
        <Line dataKey="line2" stroke-width={3} class="stroke-sc-400" />
      </Chart>
    </div>
  )
}

export default ObjectDataChart
