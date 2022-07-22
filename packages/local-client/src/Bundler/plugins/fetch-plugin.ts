import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';


const fileCache = localforage.createInstance({
  name: 'file-cache',
});

export const fetchPlugin = (input: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {

      build.onLoad({ filter: /.*/ }, async (args: any) => (
         await fileCache.getItem<esbuild.OnLoadResult>(args.path)
      ));

      build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
        return {
          loader: 'jsx',
          contents: input
        }
      });

      build.onLoad({ filter: /\.css$/ }, async (args: any) => {
        const { data } = await axios.get(args.path);

        const contents = 
        `
        const style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(data)};
        document.head.appendChild(style);
        `.replace(/\n/g, '');

        const result: esbuild.OnLoadResult =  {
          loader: 'jsx',
          contents,
        }
    

        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {


        const { data, request } = await axios.get(args.path);


        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('.', `${request.responseURL}`).pathname,
        }

        await fileCache.setItem(args.path, result);

        return result;


      });
    }
  }
};