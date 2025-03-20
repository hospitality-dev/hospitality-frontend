import { Card, Title } from "@hospitality/hospitality-ui";

export function Dashboard() {
  return (
    <div className="flex flex-col gap-y-2">
      <Card isFullWidth>
        <div className="px-4 py-2">
          <Title hasBorder label="Latest reservations" size="xl" variant="info" />
          Work in progress...
        </div>
      </Card>
      <Card isFullWidth>
        <div className="px-4 py-2">
          <Title hasBorder label="Critical inventory levels" size="xl" variant="error" />
          Work in progress...
        </div>
      </Card>
      <Card isFullWidth>
        <div className="px-4 py-2">
          <Title hasBorder label="Inventory levels" size="xl" variant="success" />
          Work in progress...
        </div>
      </Card>
    </div>
  );
}
