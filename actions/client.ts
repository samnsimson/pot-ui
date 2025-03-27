"use client";
import { appsAction } from "./client/apps";
import { contentActions } from "./client/conent";
import { mediaActions } from "./client/media";

export const client = {
    ...appsAction,
    ...contentActions,
    ...mediaActions,
};
