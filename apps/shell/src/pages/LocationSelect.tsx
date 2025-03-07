import { Button, Card, getSentenceCase, Icon, Icons, useRouteContext } from "@hospitality/hospitality-ui";

export function LocationSelect() {
  const { auth } = useRouteContext({ from: "/location-select" });
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-200">
      <div className="w-96">
        <Card isFullWidth>
          <div className="flex h-96 w-full flex-col gap-y-10 p-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-center text-2xl font-semibold">Welcome back {auth?.user.firstName}</h2>
              <h3 className="text-center font-light">Please choose a location to sign in to.</h3>
            </div>
            <ul className="flex w-full flex-col gap-y-2">
              {(auth?.locations || []).map((location) => {
                return (
                  <li key={location.locationId} className="flex w-full">
                    <Button
                      icon={Icons["arrow-right"]}
                      label={`${location.locationTitle} (${getSentenceCase(location.role)})`}
                      onClick={undefined}
                      size="xl"
                      variant="info"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
