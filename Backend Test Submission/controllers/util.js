import { randomBytes } from "crypto";
export const genCode = () => randomBytes(3).toString("hex");
