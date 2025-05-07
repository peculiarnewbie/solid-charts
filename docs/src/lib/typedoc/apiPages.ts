import type { TypeSpecification } from '@lib/typedoc/types/specifications'

const Chart: TypeSpecification = {
  kind: 'component',
  name: 'Chart',
  sorting: ['data', 'width', 'height', 'inset', 'barConfig'],
}

const Line: TypeSpecification = {
  kind: 'component',
  name: 'Line',
  sorting: ['dataKey', 'axisId', 'stackId', 'curve', 'connectNulls'],
}

const Area: TypeSpecification = {
  kind: 'component',
  name: 'Area',
  sorting: ['dataKey', 'axisId', 'stackId', 'curve', 'connectNulls'],
}

const Point: TypeSpecification = {
  kind: 'component',
  name: 'Point',
  sorting: ['dataKey', 'axisId', 'stackId', 'activeProps'],
}

const Bar: TypeSpecification = {
  kind: 'component',
  name: 'Bar',
  sorting: ['dataKey', 'axisId', 'stackId'],
}

const BarConfig: TypeSpecification = {
  kind: 'simple',
  name: 'BarConfig',
}

const Axis: TypeSpecification = {
  kind: 'component',
  name: 'Axis',
  sorting: [
    'dataKey',
    'axisId',
    'type',
    'tickCount',
    'tickValues',
    'axisRange',
  ],
}

const AxisCursor: TypeSpecification = {
  kind: 'component',
  name: 'AxisCursor',
  sorting: [],
}

const AxisGrid: TypeSpecification = {
  kind: 'component',
  name: 'AxisGrid',
  sorting: [],
}

const AxisLabel: TypeSpecification = {
  kind: 'component',
  name: 'AxisLabel',
  sorting: ['format', 'interval', 'labelGap'],
}

const AxisLine: TypeSpecification = {
  kind: 'component',
  name: 'AxisLine',
  sorting: [],
}

const AxisMark: TypeSpecification = {
  kind: 'component',
  name: 'AxisMark',
  sorting: ['length'],
}

const AxisTooltip: TypeSpecification = {
  kind: 'component',
  name: 'AxisTooltip',
  sorting: ['tickGap', 'pointerGap', 'children'],
}

const AxisValueLine: TypeSpecification = {
  kind: 'component',
  name: 'AxisValueLine',
  sorting: ['value'],
}

const ScaleType: TypeSpecification = {
  kind: 'simple',
  name: 'ScaleType',
}

const ApiPages = {
  Chart: [Chart, BarConfig],
  Series: [Line, Area, Point, Bar],
  Axis: [
    Axis,
    ScaleType,
    AxisCursor,
    AxisGrid,
    AxisLabel,
    AxisLine,
    AxisMark,
    AxisTooltip,
    AxisValueLine,
  ],
}

export default ApiPages
