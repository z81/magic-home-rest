import { httpServer } from "./httpServer";
import { Task } from "@lather/core";
import { Control, Discovery } from "magic-home";
import { Always } from "@lather/core/lib/esm/conditions";

export const ledDiscovery = httpServer
  .access<{ scanLimit: number }>()
  .chain(({ scanLimit }) =>
    Task.succeed(new Discovery())
      .map((_) => _.scan(scanLimit))
      .retryWhile(Always)
      .map((v) => {
        if (v.length === 0) {
          throw "no devices";
        }
        return v;
      })
      .flat()
      .map(
        (_: any) =>
          new Control(_.address, {
            ack: {
              color: false,
            },
          })
      )
      .collectAll()
  );
