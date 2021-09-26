import { Task } from "@lather/core";
import { httpQueue } from "./httpQueue";
import url from "url";
import { powerValidator } from "./validators/powerValidator";
import { colorValidator } from "./validators/colorValidator";
import { bightnessValidator } from "./validators/bightnessValidator";

export const reqParser = Task.sequenceGen(async function* () {
  for await (let q of httpQueue) {
    const info = url.parse(q.req.url ?? "", true);
    yield {
      ...q,
      info,
    };
  }
})
  .filter((q) => q.info.pathname === "/")
  .chain(({ req, res, info }) =>
    Task.empty
      .structPar({
        power: powerValidator(info.query.power),
        color: colorValidator(info.query.color),
        brightness: bightnessValidator(info.query.brightness),
      })
      .map((params) => ({
        req,
        res,
        info,
        params,
      }))
  );
