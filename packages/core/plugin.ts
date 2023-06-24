import { NextConfig } from "next";
import fs from "fs";
import path from "path";
import type { Compiler } from "webpack";
import { log } from "@/util/log";

export interface ModeleConfig {
  /**
   * Where to look for templates
   * @default "./templates"
   * @example
   * ```js
   * withTemplates({
   *  templateDirectory: "./templates"
   * })
   */
  templateDirectory?: string;

  /**
   * The file pattern to match, as a regex
   * @default /\.template\.(jsx|tsx)$/
   */
  fileRegex?: RegExp;
}

export const withModele = ({
  templateDirectory = "./templates",
  fileRegex = /.*\.template\.(jsx|tsx)/,
}: ModeleConfig = {}): ((nextConfig?: NextConfig) => NextConfig) => {
  return (nextConfig: NextConfig = {}) => {
    return {
      ...nextConfig,
      webpack(config, { dev, isServer, webpack, ...options }) {
        let templates: string[] = [];

        const updateTemplates = () => {
          const templateDir = path.join(process.cwd(), templateDirectory);
          log.debug("Template directory:", templateDir);

          const files = fs.readdirSync(templateDir);
          let templateFiles: string[] = [];

          // filter out files that don't match the pattern
          for (const file of files) {
            if (fileRegex.test(file)) {
              templateFiles.push(path.join(templateDir, file));
            }
          }

          templates = templateFiles;
        };

        updateTemplates();

        // set up a file watcher on the root directory
        fs.watch(templateDirectory, async (_event, filename) => {
          log.debug("File changed:", filename);
          updateTemplates();
        });

        // make templates available to the rest of the application
        config.plugins.push(
          new webpack.DefinePlugin({
            __TEMPLATES__: webpack.DefinePlugin.runtimeValue(
              () => JSON.stringify(templates),
              {
                contextDependencies: [
                  path.resolve(process.cwd(), templateDirectory),
                ],
              }
            ),
          })
        );

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, {
            dev,
            isServer,
            webpack,
            ...options,
          });
        }

        return config;
      },
    };
  };
};
