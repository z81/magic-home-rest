import { Task } from "@lather/core";
import http from "http";
import { httpQueue } from "./httpQueue";

export const httpServer = Task.empty
  .map(() => http.createServer((req, res) => httpQueue.add({ req, res })))
  .tap((server) =>
    Task.empty
      .access<{ port: number; host: string }>()
      .chain(({ host, port }) =>
        Task.fromCallback((done) => {
          server.listen(port, host, () => done(server));
        })
      )
      .tap(() => {
        console.log("started");
      })
  )
  .mapError((e) => {
    console.error(e);
  })
  .ensure((server) => {
    console.log("close ");
    server.close();
  });
