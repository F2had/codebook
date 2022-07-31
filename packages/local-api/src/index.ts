import path from "path";
import express, { request } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";

export const serve = (
  port: number,
  fileName: string,
  dir: string,
  useProxey: boolean
) => {
  const app = express();

  app.use("/cells", createCellsRouter(fileName, dir));
  if (useProxey) {
    app.use(
      createProxyMiddleware({
        target: `http://localhost:3000`,
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve(`local-client/build/index.html`);
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        console.log(`Serving ${fileName} on http://localhost:${port}`);
      })
      .on("error", reject);
  });
};
