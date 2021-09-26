import { Task } from "@lather/core";
import { Control } from "magic-home";

export const setPower = (power: boolean | undefined) =>
  Task.succeed(power)
    .filter((_) => _ !== undefined)
    .chain((power) =>
      Task.empty
        .access<{ control: Control }>()
        .tap(({ control }) => control.setPower(power!))
    );
