import { Axis, AxisCursor, AxisGrid, Chart, Point } from 'solid-charts'

const values = [1, 3, 2, 5, 3, 6, 2]

const ActivePointChart = () => {
  return (
    <div class="h-37.5 w-75">
      <Chart data={values} inset={12}>
        {/* // truncate-start */}
        <Axis axis="y" position="left" tickCount={4}>
          <AxisGrid class="stroke-sc-text/20" />
        </Axis>
        <Axis axis="x" position="bottom">
          <AxisCursor
            stroke-dasharray="10,10"
            stroke-width={2}
            class="stroke-sc-text/70 transition-opacity"
          />
        </Axis>
        {/* // truncate-end */}
        <Point
          r={4}
          class="text-sc-400 transition-all"
          activeProps={{ r: 10 }}
        />
      </Chart>
    </div>
  )
}

export default ActivePointChart
