import { httpServer } from "./httpServer";
import { Task } from "@lather/core";
import { Control, Discovery } from "magic-home";
import { Retry } from "@lather/core/lib/cjs/retry";

export const ledDiscovery = httpServer
  .access<{ scanLimit: number }>()
  .chain(({ scanLimit }) =>
    Task.succeed(new Discovery())
      .map((_) => _.scan(scanLimit))
      .retryWhile(Retry.always)
      .map((d) => {
        if (d.length === 0) {
          throw "no devices";
        }

        return d;
      })
      .flat()
      .map((_: any) => new Control(_.address))
      .collectAll()
  );
