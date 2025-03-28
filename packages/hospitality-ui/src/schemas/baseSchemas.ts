import { z } from "zod";

import { AvailableActionsEnum, AvailableEntitiesEnum } from "../enums";

export const zodAvailableEntities = z.enum(AvailableEntitiesEnum);
export const zodAvailableActions = z.enum(AvailableActionsEnum);
