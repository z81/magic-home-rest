import { Task } from "@lather/core";

export const powerValidator = (power: unknown) =>
  Task.succeed(power)
    .filter(Boolean)
    .map((_) => _ === "1");
