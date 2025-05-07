import {
  Axis,
  AxisCursor,
  AxisGrid,
  AxisLabel,
  AxisTooltip,
  Bar,
  Chart,
} from 'solid-charts'

const values1 = [21, 38, 25, 21, 29, 39, 38]
const values2 = [18, 10, 29, 11, 17, 27, 15]

const data = values1.map((value1, index) => ({
  xAxis: `Day ${index + 1}`,
  value1,
  value2: values2[index],
}))

const StackedBarChart = () => {
  return (
    <div class="h-62.5 text-sm w-125 m-6">
      <Chart data={data}>
        <Axis axis="y" position="left">
          <AxisLabel />
          <AxisGrid class="opacity-20" />
        </Axis>
        <Bar dataKey="value2" stackId="myStack" class="fill-sc-200" />
        <Bar dataKey="value1" stackId="myStack" class="fill-sc-400" />
        <Axis axis="x" position="bottom" dataKey="xAxis">
          <AxisLabel />
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
                  <p class="grow ml-1.5">Value 1</p>
                  <p class="ml-3">{props.data.value1}</p>
                </div>
                <div class="flex items-center px-2 py-1">
                  <div class="rounded-full size-2 bg-sc-200" />
                  <p class="grow ml-1.5">Value 2</p>
                  <p class="ml-3">{props.data.value2}</p>
                </div>
              </>
            )}
          </AxisTooltip>
        </Axis>
      </Chart>
    </div>
  )
}

export default StackedBarChart
