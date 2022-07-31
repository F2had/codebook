import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let esbuildInitialized = false;

const esbuild_wasmURL = "https://unpkg.com/esbuild-wasm@0.14.43/esbuild.wasm";

const initializeEsbuild = async () => {
  await esbuild.initialize({
    wasmURL: esbuild_wasmURL,
    worker: true,
  });
  esbuildInitialized = true;
};

export const bundle = async (rawCode: string) => {
  try {
    if (!esbuildInitialized) {
      await initializeEsbuild();
    }
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      target: "es2015",
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    return {
      code: result?.outputFiles[0]?.text,
      err: "",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: "",
        err: error.message,
      };
    }
  }
};

export default bundle;
