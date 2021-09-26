import { Task } from "@lather/core";
import { Control } from "magic-home";

export const setColor = (
  color: number[],
  brightness?: number,
  power?: boolean
) =>
  Task.succeed(power)
    .filter(Boolean)
    .mapTo(color)
    .chain(([r, g, b]) =>
      Task.empty
        .access<{ control: Control }>()
        .map(({ control }) =>
          control
            .setColorWithBrightness(r, g, b, brightness ?? 100)
            .catch(() => {})
        )
    );
