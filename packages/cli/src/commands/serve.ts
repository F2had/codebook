import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command("serve")
  .command("serve [filename]")
  .option("-p, --port <number>", "Port to serve on", "4050")
  .description("Start the server")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
    } catch (error: any) {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${options.port} is already in use.`);
        console.log(`Try running with flag "-p ${parseInt(options.port) + 1}"`);
      } else {
        console.error(error);
      }
      process.exit(1);
    }
  });
