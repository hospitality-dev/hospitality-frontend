import { z } from "zod";

import { AvailableActionsEnum, AvailableDomainsEnum, AvailableEntitiesEnum } from "../enums";

export const zodAvailableEntities = z.enum(AvailableEntitiesEnum);
export const zodAvailableActions = z.enum(AvailableActionsEnum);
export const zodAvailableDomains = z.enum(AvailableDomainsEnum);
