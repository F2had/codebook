import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

export const serveCommand = new Command("serve")
  .command("serve [filename]")
  .option("-p, --port <number>", "Port to serve on", "4050")
  .description("Start the server")
  .action((filename = "notebook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(Number(options.port), path.basename(filename), dir);
  });
