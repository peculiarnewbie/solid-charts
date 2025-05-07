import {
  Area,
  Axis,
  AxisCursor,
  AxisGrid,
  AxisLabel,
  AxisLine,
  AxisMark,
  AxisTooltip,
  AxisValueLine,
  Bar,
  Chart,
  Line,
  Point,
} from 'solid-charts'
import { curveNatural } from 'solid-charts/curves'

const data = Array.from({ length: 7 }, (_, i) => ({
  xAxis: `Day ${i + 1}`,
  area: Math.round(Math.random() * 100) + 10,
  area2: Math.round(Math.random() * 100) + 100,
  areaNulls: i === 3 ? null : Math.round(Math.random() * 100) + 10,
  areaNegative: Math.round(Math.random() * 100) - 100,
}))

const timeseries = Array.from({ length: 100 }, (_, i) => ({
  xAxis: new Date(new Date().getTime() + i * 1000 * 60 * 60 * 24).toISOString(),
  visitors: Math.round(Math.random() * 10) + 5,
}))

export default () => {
  return (
    <div>
      <div class="p-10 gap-5 grid grid-cols-2 text-sm max-w-320 mx-auto">
        <Chart data={data} width={500} height={250}>
          <Area dataKey="area" class="text-purple-200" />
          <Area dataKey="areaNegative" class="text-green-200" />
          <Axis axis="y" position="left">
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom">
            <AxisLabel />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-dasharray="10,10"
              stroke-width={2}
              class="stroke-black transition-opacity"
            />
          </Axis>
          <Line dataKey="area" class="text-purple-500" stroke-width={4} />
          <Line
            dataKey="areaNegative"
            class="text-green-500"
            stroke-width={4}
          />
          <Point
            dataKey="area"
            class="text-purple-700 stroke-white"
            r={5}
            stroke-width={2}
          />
          <Point
            dataKey="areaNegative"
            class="text-green-700 stroke-white"
            r={5}
            stroke-width={2}
          />
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Axis
            axis="y"
            position="left"
            axisRange={[0, 100]}
            tickValues={[0, 50, 90, 100]}
          >
            <AxisLabel
              labelGap={0}
              class="nth-[3]:text-green-600 nth-[2]:text-orange-500"
            />
            <AxisValueLine
              value={50}
              stroke-width={2}
              stroke-dasharray="10"
              class="text-orange-500"
            />
            <AxisValueLine
              value={90}
              stroke-width={2}
              stroke-dasharray="10"
              class="text-green-500"
            />
            <AxisValueLine value={100} stroke-width={1} class="text-black" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom">
            <AxisLabel />
            <AxisLine class="stroke-black" />
            <AxisMark class="stroke-black" />
            <AxisCursor
              stroke-width={1}
              class="stroke-black transition-opacity"
            />
          </Axis>
          <Line dataKey="area" class="text-blue-500" stroke-width={2} />
          <Point
            dataKey="area"
            class="text-blue-700 stroke-white"
            r={5}
            stroke-width={2}
          />
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Area
            dataKey="area"
            curve={curveNatural}
            class="text-orange-200"
            stroke-width={4}
            stroke-dasharray="4,4"
          />
          <Axis axis="y" position="right" tickCount={4}>
            <AxisLabel />
            <AxisLine class="stroke-black" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom">
            <AxisLabel />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-dasharray="10,10"
              stroke-width={2}
              class="stroke-black transition-opacity"
            />
          </Axis>
          <Line
            dataKey="area"
            curve={curveNatural}
            class="text-orange-500"
            stroke-width={4}
          />
          <Point
            dataKey="area"
            class="text-orange-700 stroke-white"
            r={5}
            stroke-width={2}
          />
        </Chart>
        <Chart data={data} width={500} height={250}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stop-color="currentColor"
                stop-opacity={0.8}
                class="text-cyan-200"
              />
              <stop
                offset="95%"
                stop-color="currentColor"
                stop-opacity={0}
                class="text-cyan-200"
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="area"
            curve={curveNatural}
            fill="url(#areaGradient)"
            stroke-width={4}
            stroke-dasharray="4,4"
          />
          <Axis axis="y" position="right" tickCount={4}>
            <AxisLabel />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom">
            <AxisLabel />
            <AxisCursor
              stroke-dasharray="10,10"
              stroke-width={2}
              class="stroke-black transition-opacity"
            />
            <AxisLine class="stroke-black" />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>{props.data.xAxis}</p>
                  </div>
                  <div class="flex items-center gap-2 p-2 text-xs">
                    <p class="grow text-zinc-800">Coffee</p>
                    <p>{props.data.area}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
          <Line
            dataKey="area"
            curve={curveNatural}
            class="text-cyan-500"
            stroke-width={4}
          />
          <Point
            dataKey="area"
            class="text-cyan-700 data-active:text-cyan-600 transition-all stroke-white"
            r={5}
            stroke-width={2}
            activeProps={{ r: 7 }}
          />
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Area dataKey="area2" stackId="area" class="text-green-200" />
          <Area dataKey="area" stackId="area" class="text-cyan-200" />
          <Line
            dataKey="area2"
            stackId="area"
            class="text-green-500"
            stroke-width={4}
          />
          <Point
            dataKey="area2"
            stackId="area"
            class="text-green-700 stroke-white"
            r={5}
            stroke-width={2}
          />
          <Line
            dataKey="area"
            stackId="area"
            class="text-cyan-500"
            stroke-width={4}
          />
          <Point
            dataKey="area"
            stackId="area"
            class="text-cyan-700 stroke-white"
            r={5}
            stroke-width={2}
          />
          <Axis axis="y" position="left" tickCount={4}>
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom">
            <AxisLabel />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-dasharray="10,10"
              stroke-width={2}
              class="stroke-black transition-opacity"
            />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>{props.data.xAxis}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-cyan-500" />
                    <p class="grow text-zinc-800">Area 1</p>
                    <p>{props.data.area}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-green-500" />
                    <p class="grow text-zinc-800">Area 2</p>
                    <p>{props.data.area2}</p>
                  </div>
                  <div class="flex items-center border-t border-zinc-200 gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-gradient-to-r from-cyan-500 to-green-500" />
                    <p class="grow text-zinc-800">Total</p>
                    <p>{props.data.area + props.data.area2}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Axis dataKey="area" axis="y" position="left" tickCount={4}>
            <AxisLabel class="text-purple-600" />
          </Axis>
          <Axis axisId="area2" axis="y" position="right" tickCount={4}>
            <AxisLabel class="text-blue-600" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom">
            <AxisLabel />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-dasharray="10,10"
              stroke-width={2}
              class="stroke-black transition-opacity"
            />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>{props.data.xAxis}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-purple-500" />
                    <p class="grow text-zinc-800">Area 1</p>
                    <p>{props.data.area}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-blue-500" />
                    <p class="grow text-zinc-800">Area 2</p>
                    <p>{props.data.area2}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
          <Line dataKey="area" class="text-purple-500" stroke-width={4} />
          <Point
            dataKey="area"
            class="text-purple-700 stroke-white"
            r={5}
            stroke-width={2}
          />
          <Line
            dataKey="area2"
            axisId="area2"
            class="text-blue-500"
            stroke-width={4}
          />
          <Point
            dataKey="area2"
            axisId="area2"
            class="text-blue-700 stroke-white"
            r={5}
            stroke-width={2}
          />
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Axis dataKey="area" axis="y" position="left" tickCount={4}>
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom">
            <AxisLabel />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-dasharray="10,10"
              stroke-width={2}
              class="stroke-black transition-opacity"
            />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>{props.data.xAxis}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-purple-500" />
                    <p class="grow text-zinc-800">Area 1</p>
                    <p>{props.data.area}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-blue-500" />
                    <p class="grow text-zinc-800">Area 2</p>
                    <p>{props.data.area2}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
          <Line dataKey="area" class="text-purple-500" stroke-width={4} />
          <Point
            dataKey="area"
            class="text-purple-700 stroke-white"
            r={5}
            stroke-width={2}
          />
          <Line dataKey="area2" class="text-blue-500" stroke-width={4} />
          <Point
            dataKey="area2"
            class="text-blue-700 stroke-white"
            r={5}
            stroke-width={2}
          />
        </Chart>
        <Chart data={timeseries} width={500} height={250}>
          <Line dataKey="visitors" class="text-teal-500" stroke-width={3} />
          <Axis axis="y" position="left" tickCount={4}>
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom" tickCount={5}>
            <AxisLabel
              format={(value) =>
                `${new Date(value).getDate()}. ${formatMonth(new Date(value))}`
              }
            />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-width={1}
              class="stroke-black/70 transition-opacity"
            />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>
                      {new Date(props.data.xAxis).getDate()}.{' '}
                      {formatMonth(new Date(props.data.xAxis))}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-teal-500" />
                    <p class="grow text-zinc-800">Visitors</p>
                    <p>{props.data.visitors}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Axis axis="y" position="left" tickCount={4}>
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom" tickCount={5}>
            <AxisLabel
              format={(value) =>
                `${new Date(value).getDate()}. ${formatMonth(new Date(value))}`
              }
            />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-width={1}
              class="stroke-black/70 transition-opacity"
            />
            <AxisMark />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>
                      {new Date(props.data.xAxis).getDate()}.{' '}
                      {formatMonth(new Date(props.data.xAxis))}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-purple-500" />
                    <p class="grow text-zinc-800">Area 1</p>
                    <p>{props.data.area}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-blue-500" />
                    <p class="grow text-zinc-800">Area 2</p>
                    <p>{props.data.area2}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
          <Bar dataKey="area" class="text-purple-400" />
          <Bar dataKey="area2" class="text-blue-400" />
          <Line dataKey="area" stroke-width={4} class="text-lime-400" />
          <Point dataKey="area" class="text-lime-600" />
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Axis axis="y" position="left" tickCount={4}>
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom" tickCount={5}>
            <AxisLabel
              format={(value) =>
                `${new Date(value).getDate()}. ${formatMonth(new Date(value))}`
              }
            />
            <AxisLine class="stroke-black" />
            <AxisMark />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>
                      {new Date(props.data.xAxis).getDate()}.{' '}
                      {formatMonth(new Date(props.data.xAxis))}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-purple-500" />
                    <p class="grow text-zinc-800">Area 1</p>
                    <p>{props.data.area}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-blue-500" />
                    <p class="grow text-zinc-800">Area 2</p>
                    <p>{props.data.area2}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
          <Bar dataKey="area" stackId="a" class="text-purple-400" />
          <Bar dataKey="area2" stackId="a" class="text-blue-400" />
          <Axis dataKey="xAxis" axis="x" position="bottom" tickCount={5}>
            <AxisCursor
              stroke-width={1}
              class="stroke-black/70 transition-opacity"
            />
          </Axis>
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Axis axis="y" position="left" tickCount={4}>
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom" tickCount={5}>
            <AxisLabel
              format={(value) =>
                `${new Date(value).getDate()}. ${formatMonth(new Date(value))}`
              }
            />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-width={1}
              class="stroke-black/70 transition-opacity"
            />
            <AxisMark />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>
                      {new Date(props.data.xAxis).getDate()}.{' '}
                      {formatMonth(new Date(props.data.xAxis))}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-purple-500" />
                    <p class="grow text-zinc-800">Area 1</p>
                    <p>{props.data.area}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-blue-500" />
                    <p class="grow text-zinc-800">Area 2</p>
                    <p>{props.data.area2}</p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-teal-500" />
                    <p class="grow text-zinc-800">Area 2</p>
                    <p>{props.data.area2}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
          <Bar dataKey="area" stackId="a" class="text-purple-400" />
          <Bar dataKey="area2" stackId="a" class="text-blue-400" />
          <Bar dataKey="area2" class="text-teal-500" />
        </Chart>
        <Chart data={data} width={500} height={250}>
          <Area dataKey="areaNulls" class="text-purple-200" />
          <Axis axis="y" position="left">
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom">
            <AxisLabel />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-dasharray="10,10"
              stroke-width={2}
              class="stroke-black transition-opacity"
            />
          </Axis>
          <Line dataKey="areaNulls" class="text-purple-500" stroke-width={4} />
          <Point
            dataKey="areaNulls"
            class="text-purple-700 stroke-white"
            r={5}
            stroke-width={2}
          />
        </Chart>
      </div>
      <div class="h-15">
        <Chart data={data} width={200} height={100}>
          <Line dataKey="area" class="text-purple-500" stroke-width={4} />
        </Chart>
      </div>
      <div class="mx-10 pb-10">
        <Chart data={timeseries} height={250}>
          <Line
            dataKey="visitors"
            curve={curveNatural}
            class="text-teal-500"
            stroke-width={3}
          />
          <Axis axis="y" position="left" tickCount={4}>
            <AxisLabel />
            <AxisGrid class="stroke-black/10" />
          </Axis>
          <Axis dataKey="xAxis" axis="x" position="bottom" tickCount={5}>
            <AxisLabel
              format={(value) =>
                `${new Date(value).getDate()}. ${formatMonth(new Date(value))}`
              }
              interval="preserveStartEnd"
            />
            <AxisLine class="stroke-black" />
            <AxisCursor
              stroke-width={1}
              class="stroke-black/70 transition-opacity"
            />
            <AxisTooltip class="flex flex-col rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white">
              {(props) => (
                <>
                  <div class="bg-zinc-50 border-b border-zinc-200 flex justify-between items-center p-2 text-xs font-medium">
                    <p>
                      {new Date(props.data.xAxis).getDate()}.{' '}
                      {formatMonth(new Date(props.data.xAxis))}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 px-2 py-1 text-xs">
                    <div class="rounded-full size-2 bg-teal-500" />
                    <p class="grow text-zinc-800">Visitors</p>
                    <p>{props.data.visitors}</p>
                  </div>
                </>
              )}
            </AxisTooltip>
          </Axis>
        </Chart>
      </div>
    </div>
  )
}

const { format: formatMonth } = new Intl.DateTimeFormat('en', {
  month: 'short',
})
