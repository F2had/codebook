import * as esbuild from 'esbuild-wasm';



export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
   
      // handle root file
      build.onResolve({ filter: /(^index\.js$)/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          path: 'index.js',
          namespace: 'a'
        }
      })

      // handle relative path
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
          namespace: 'a',
        }
      });

      // Handle main file of a package
      build.onResolve({ filter:  /.*/ }, async (args: any) => {
      
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        }
      });

      
  
    },
  };
}