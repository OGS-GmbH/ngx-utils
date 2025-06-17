import { angularConfig, angularTemplateConfig, HTML_FILES, ignoreConfig, initAngularLinter, TS_FILES } from "@ogs/linter";
import { IGNORE_PATHS } from "./linter.config.mjs";

const options = {
  selectorPrefix: "ogs",
  root: import.meta.dirname
};

export default initAngularLinter(
  ignoreConfig(IGNORE_PATHS),
  angularConfig({
                  files: [
                    `**/src/${ TS_FILES }`
                  ],
                  root: options.root,
                  selectorPrefix: options.selectorPrefix
                }),
  angularTemplateConfig({
                          files: [
                            `**/src/${ HTML_FILES }`
                          ],
                          root: options.root,
                          selectorPrefix: options.selectorPrefix
                        })
);
