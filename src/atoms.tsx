import { atom } from "jotai";
import { Tables } from "./types/database.types";

export const selectedGroupAtom = atom<Tables<"groups"> | null>(null);
