import { Card, Icon, Icons, useScreenSize } from "@hospitality/hospitality-ui";

export function ProductSettings() {
  const { isLg } = useScreenSize();
  return (
    <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
      <Card isFullWidth={!isLg}>
        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <Icon className="-rotate-45 pt-2" color="#FBB117" fontSize={64} icon={Icons.beer} />
          <p className="text-lg font-semibold">Heineken</p>
        </div>
      </Card>
      <Card isFullWidth={!isLg} variant="info">
        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <Icon color="#ff5623" fontSize={64} icon={Icons.chicken} />
          <p className="text-lg font-semibold">Chicken</p>
        </div>
      </Card>
    </div>
  );
}
