import { Task } from "@lather/core";
import { setPower } from "./commands/setPower";
import { setColor } from "./commands/setColor";
import { ledDiscovery } from "./ledDiscovery";
import { reqParser } from "./reqParser";
import { Always } from "@lather/core/lib/esm/conditions";

const app = ledDiscovery.chain(([control]) =>
  reqParser.chain(({ req, res, params }) =>
    Task.structPar({
      power: setPower(params.power),
      color: setColor(params.color, params.brightness, params.power),
    })
      .provide({ control })
      .tap(() => {
        res.writeHead(200);
        res.end("ok");
      })
      .mapError(() => {
        res.writeHead(500);
        res.end("error");
      })
      .restoreWhen(Always)
  )
);

app
  .provide({
    port: 8923,
    host: "0.0.0.0",
    scanLimit: 500,
  })
  .run();
