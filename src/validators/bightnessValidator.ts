import { Task } from "@lather/core";

export const bightnessValidator = (brightness: unknown) =>
  Task.succeed(brightness)
    .map(Number)
    .filter((_) => _ >= 0 && _ <= 100);
