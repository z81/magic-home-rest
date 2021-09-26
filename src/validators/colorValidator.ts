import { Task } from "@lather/core";

export const colorValidator = (color: unknown) =>
  Task.succeed(color)
    .map(String)
    .map(JSON.parse)
    .filter(Array.isArray)
    .flat()
    .map(Number)
    .filter((_) => !Number.isNaN(_))
    .collectAll()
    .filter((_) => _.length === 3);
