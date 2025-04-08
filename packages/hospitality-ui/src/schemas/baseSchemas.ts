import { z } from "zod";

import { AvailableActionsEnum, AvailableDomains, AvailableEntitiesEnum } from "../enums";

export const zodAvailableEntities = z.enum(AvailableEntitiesEnum);
export const zodAvailableActions = z.enum(AvailableActionsEnum);
export const zodAvailableDomains = z.enum(AvailableDomains);
