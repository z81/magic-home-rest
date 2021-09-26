import { Queue } from "@lather/core/lib/cjs/queue";
import http from "http";

export const httpQueue = new Queue<{
  req: http.IncomingMessage;
  res: http.ServerResponse;
}>();
