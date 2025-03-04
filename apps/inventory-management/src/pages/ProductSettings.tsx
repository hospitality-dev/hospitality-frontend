import { Card, Icon, Icons } from "@hospitality/hospitality-ui";

export function ProductSettings() {
  return (
    <div className="grid h-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12">
      <div className="flex items-center justify-center">
        <Card>
          <div className="flex h-full flex-col items-center justify-center gap-y-2">
            <Icon className="-rotate-45" color="#FBB117" fontSize={64} icon={Icons.beer} />
            <p className="text-lg font-semibold">Heineken</p>
          </div>
        </Card>
      </div>
      <div className="flex items-center justify-center">
        <Card variant="secondary">
          <div className="flex h-full flex-col items-center justify-center gap-y-2">
            <Icon color="#ff5623" fontSize={64} icon={Icons.chicken} />
            <p className="text-lg font-semibold">Chicken</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
