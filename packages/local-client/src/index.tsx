import * as esbuild from "esbuild-wasm";
import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from "./Components/App";

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const esbuild_wasmURL = "https://unpkg.com/esbuild-wasm@0.14.43/esbuild.wasm";
(async () => {
  await esbuild.initialize({
    wasmURL: esbuild_wasmURL,
    worker: true,
  });
})();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<React.StrictMode>{<App />}</React.StrictMode>);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();