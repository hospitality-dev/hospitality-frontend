import { availableIcons, Icons } from "@hospitality/hospitality-ui";

export const Modules: { id: string; icon: availableIcons }[] = [
  {
    id: "booking" as const,
    icon: Icons.booking,
  },
  {
    id: "employee-management" as const,
    icon: Icons.employee,
  },
  { id: "inventory-management" as const, icon: Icons.inventory },
  {
    id: "suppliers" as const,
    icon: Icons.supplier,
  },
];
