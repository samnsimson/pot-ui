"use client";
import { appsAction } from "./client/apps";
import { contentActions } from "./client/conent";

export const client = {
    ...appsAction,
    ...contentActions,
};
