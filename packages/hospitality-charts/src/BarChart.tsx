import { Title } from "@hospitality/hospitality-ui";
import { BarDatum, ResponsiveBar, ResponsiveBarSvgProps } from "@nivo/bar";

export function BarChart<T>({
  animate,
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
  margin,
  padding = 0.5,
  valueScale = { type: "linear" },
  data = [],
  maxValue,
  layout,
  tooltipLabel,
  minValue = 0,
  title,
}: ResponsiveBarSvgProps<BarDatum> & { data: T[]; keys: (keyof T)[]; title?: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-y-2">
      {title ? (
        <div className="px-4 py-2">
          <Title hasBorder label={title} size="xl" variant="primary" />
        </div>
      ) : null}
      <ResponsiveBar
        animate={animate}
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
    </div>
  );
}
