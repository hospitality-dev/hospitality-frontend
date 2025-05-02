import { Title } from "@hospitality/hospitality-ui";
import { DefaultRawDatum, PieSvgProps, ResponsivePie } from "@nivo/pie";
export { type DefaultRawDatum, type PieCustomLayerProps, type PieTooltipProps } from "@nivo/pie";
export function PieChart({
  arcLabel,
  arcLinkLabel,
  activeOuterRadiusOffset,
  arcLabelsSkipAngle,
  arcLabelsComponent,
  arcLabelsRadiusOffset,
  arcLabelsSkipRadius,
  defs,
  enableArcLabels,
  enableArcLinkLabels,
  arcLinkLabelsOffset,
  arcLinkLabelsDiagonalLength,
  legends,
  arcLinkLabelsColor = { from: "color" },
  arcLabelsTextColor,
  borderColor,
  borderWidth = 1,
  cornerRadius = 10,
  padAngle = 1,
  innerRadius = 0.5,
  fill,
  startAngle,
  margin,
  data,
  theme,
  colors,
  title,
  tooltip,
}: Omit<PieSvgProps<DefaultRawDatum>, "width" | "height"> & { title?: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-y-2">
      {title ? (
        <div className="px-4 py-2">
          <Title hasBorder label={title} size="xl" variant="primary" />
        </div>
      ) : null}
      <ResponsivePie
        activeOuterRadiusOffset={activeOuterRadiusOffset}
        animate
        arcLabel={arcLabel}
        arcLabelsComponent={arcLabelsComponent}
        arcLabelsRadiusOffset={arcLabelsRadiusOffset}
        arcLabelsSkipAngle={arcLabelsSkipAngle}
        arcLabelsSkipRadius={arcLabelsSkipRadius}
        arcLabelsTextColor={arcLabelsTextColor}
        arcLinkLabel={arcLinkLabel}
        arcLinkLabelsColor={arcLinkLabelsColor}
        arcLinkLabelsDiagonalLength={arcLinkLabelsDiagonalLength}
        arcLinkLabelsOffset={arcLinkLabelsOffset}
        arcLinkLabelsSkipAngle={20}
        borderColor={borderColor}
        borderWidth={borderWidth}
        colors={colors}
        cornerRadius={cornerRadius}
        data={data}
        defs={defs}
        enableArcLabels={enableArcLabels}
        enableArcLinkLabels={enableArcLinkLabels}
        fill={fill}
        innerRadius={innerRadius}
        legends={legends}
        margin={margin}
        padAngle={padAngle}
        startAngle={startAngle}
        theme={theme}
        tooltip={tooltip}
      />
    </div>
  );
}
