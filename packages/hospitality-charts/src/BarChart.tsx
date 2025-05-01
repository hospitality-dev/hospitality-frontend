import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    country: "AD",
    "hot dog": 60,
    "hot dogColor": "hsl(38, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(232, 70%, 50%)",
    sandwich: 105,
    sandwichColor: "hsl(140, 70%, 50%)",
    kebab: 22,
    kebabColor: "hsl(82, 70%, 50%)",
    fries: 26,
    friesColor: "hsl(285, 70%, 50%)",
    donut: 24,
    donutColor: "hsl(304, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 159,
    "hot dogColor": "hsl(181, 70%, 50%)",
    burger: 43,
    burgerColor: "hsl(128, 70%, 50%)",
    sandwich: 16,
    sandwichColor: "hsl(186, 70%, 50%)",
    kebab: 117,
    kebabColor: "hsl(157, 70%, 50%)",
    fries: 6,
    friesColor: "hsl(131, 70%, 50%)",
    donut: 171,
    donutColor: "hsl(201, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 140,
    "hot dogColor": "hsl(271, 70%, 50%)",
    burger: 138,
    burgerColor: "hsl(34, 70%, 50%)",
    sandwich: 67,
    sandwichColor: "hsl(287, 70%, 50%)",
    kebab: 86,
    kebabColor: "hsl(102, 70%, 50%)",
    fries: 26,
    friesColor: "hsl(242, 70%, 50%)",
    donut: 154,
    donutColor: "hsl(187, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 41,
    "hot dogColor": "hsl(240, 70%, 50%)",
    burger: 49,
    burgerColor: "hsl(238, 70%, 50%)",
    sandwich: 109,
    sandwichColor: "hsl(216, 70%, 50%)",
    kebab: 39,
    kebabColor: "hsl(358, 70%, 50%)",
    fries: 191,
    friesColor: "hsl(194, 70%, 50%)",
    donut: 106,
    donutColor: "hsl(359, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 199,
    "hot dogColor": "hsl(95, 70%, 50%)",
    burger: 10,
    burgerColor: "hsl(159, 70%, 50%)",
    sandwich: 30,
    sandwichColor: "hsl(178, 70%, 50%)",
    kebab: 117,
    kebabColor: "hsl(222, 70%, 50%)",
    fries: 134,
    friesColor: "hsl(154, 70%, 50%)",
    donut: 172,
    donutColor: "hsl(84, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 0,
    "hot dogColor": "hsl(308, 70%, 50%)",
    burger: 146,
    burgerColor: "hsl(51, 70%, 50%)",
    sandwich: 52,
    sandwichColor: "hsl(287, 70%, 50%)",
    kebab: 5,
    kebabColor: "hsl(180, 70%, 50%)",
    fries: 69,
    friesColor: "hsl(227, 70%, 50%)",
    donut: 12,
    donutColor: "hsl(265, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 7,
    "hot dogColor": "hsl(107, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(156, 70%, 50%)",
    sandwich: 169,
    sandwichColor: "hsl(151, 70%, 50%)",
    kebab: 106,
    kebabColor: "hsl(260, 70%, 50%)",
    fries: 158,
    friesColor: "hsl(55, 70%, 50%)",
    donut: 168,
    donutColor: "hsl(66, 70%, 50%)",
  },
];

export function BarChart() {
  return (
    <ResponsiveBar
      ariaLabel="Nivo bar chart demo"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      axisRight={null}
      axisTop={null}
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      colors={{ scheme: "nivo" }}
      data={data}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      indexBy="country"
      indexScale={{ type: "band", round: true }}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      labelSkipHeight={12}
      labelSkipWidth={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
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
      ]}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      role="application"
      valueScale={{ type: "linear" }}
    />
  );
}
