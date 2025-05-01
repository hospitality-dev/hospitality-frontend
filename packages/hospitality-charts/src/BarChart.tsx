import { BarDatum, ResponsiveBar, ResponsiveBarSvgProps } from "@nivo/bar";

export function BarChart<T>({
  axisBottom,
  axisLeft,
  axisRight,
  axisTop,
  borderColor = {
    from: "color",
    modifiers: [["darker", 1.5]],
  },
  colors,
  theme,
  defs,
  fill,
  indexBy,
  indexScale,
  keys,
  labelSkipHeight = 10,
  labelSkipWidth = 10,
  groupMode = "stacked",
  labelTextColor = {
    from: "color",
    modifiers: [["darker", 1.5]],
  },
  legends = [
    {
      dataFrom: "keys",
      toggleSerie: true,
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 120,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      symbolSize: 20,
      effects: [
        {
          on: "hover",
          style: {
            itemOpacity: 1,
          },
        },
      ],
    },
  ],
  margin = { top: 50, right: 130, bottom: 50, left: 60 },
  padding = 0.5,
  valueScale = { type: "linear" },
  data = [],
  maxValue,
  layout,
  tooltipLabel,
  minValue = 0,
}: ResponsiveBarSvgProps<BarDatum> & { data: T[]; keys: (keyof T)[] }) {
  return (
    <ResponsiveBar
      axisBottom={axisBottom}
      axisLeft={axisLeft}
      axisRight={axisRight}
      axisTop={axisTop}
      borderColor={borderColor}
      colors={colors}
      data={data}
      defs={defs}
      fill={fill}
      groupMode={groupMode}
      indexBy={indexBy}
      indexScale={indexScale}
      keys={keys}
      labelSkipHeight={labelSkipHeight}
      labelSkipWidth={labelSkipWidth}
      labelTextColor={labelTextColor}
      layout={layout}
      legends={legends}
      margin={margin}
      maxValue={maxValue}
      minValue={minValue}
      motionConfig="stiff"
      padding={padding}
      theme={theme}
      tooltipLabel={tooltipLabel}
      valueScale={valueScale}
    />
  );
}
