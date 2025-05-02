import { Title } from "@hospitality/hospitality-ui/src";
import { LineSeries, LineSvgProps, ResponsiveLine } from "@nivo/line";

export function LineChart<T>({
  axisBottom,
  axisLeft,
  axisRight,
  axisTop,
  legends,
  colors,
  margin,
  pointBorderColor,
  pointBorderWidth,
  pointColor,
  pointLabelYOffset,
  pointSize,
  xScale,
  yFormat = " >.2f",
  xFormat,
  yScale,
  data,
  title,
  theme,
  tooltip,
}: Omit<LineSvgProps<LineSeries>, "width" | "height"> & { data: T[]; title?: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-y-2">
      {title ? (
        <div className="px-4 py-2">
          <Title hasBorder label={title} size="xl" variant="primary" />
        </div>
      ) : null}
      <ResponsiveLine
        animate
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        axisRight={axisRight}
        axisTop={axisTop}
        colors={colors}
        data={data}
        enableTouchCrosshair
        legends={legends}
        margin={margin}
        motionConfig="gentle"
        pointBorderColor={pointBorderColor}
        pointBorderWidth={pointBorderWidth}
        pointColor={pointColor}
        pointLabelYOffset={pointLabelYOffset}
        pointSize={pointSize}
        theme={theme}
        tooltip={tooltip}
        useMesh
        xFormat={xFormat}
        xScale={xScale}
        yFormat={yFormat}
        yScale={yScale}
      />
    </div>
  );
}
