import { availableIcons, Icons } from "@hospitality/hospitality-ui";

export const Modules: { id: string; title: string; icon: availableIcons }[] = [
  {
    id: "booking" as const,
    title: "Booking",
    icon: Icons.booking,
  },
  {
    id: "employee-management" as const,
    title: "Employee management" as const,
    icon: Icons.employee,
  },
  { id: "inventory-management" as const, title: "Inventory management", icon: Icons.inventory },
  {
    id: "suppliers" as const,
    title: "Suppliers",
    icon: Icons.supplier,
  },
];
