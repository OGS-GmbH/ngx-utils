import {
  ESLINT_JSON_RULES,
  ESLINT_MARKDOWN_RULES,
  JS_RULES_PRESET,
  ANGULAR_TEMPLATE_RULES_PRESET,
  getAngularTsPreset
} from "@ogs-gmbh/linter";
import globals from "globals";
import eslintJsonPlugin from "@eslint/json";
import eslintMarkdownPlugin from "@eslint/markdown";
import stylisticPlugin from "@stylistic/eslint-plugin";
import tseslintPlugin from "typescript-eslint";
import unicornPlugin from "eslint-plugin-unicorn";
import angularPlugin from "angular-eslint";
import jsdocPlugin from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    plugins: {
      "@tseslint": tseslintPlugin.plugin,
      "@unicorn": unicornPlugin,
      "@stylistic": stylisticPlugin,
      "@jsdoc": jsdocPlugin,
      "@markdown": eslintMarkdownPlugin,
      "@json": eslintJsonPlugin,
      "@angular-template": angularPlugin.templatePlugin,
      "@angular": angularPlugin.tsPlugin
    }
  },
  {
    ignores: [
      ".angular",
      ".git",
      ".husky",
      ".idea",
      ".vscode",
      "node_modules",
      "dist",
      ".vitepress/.vitepress/cache"
    ]
  },
  {
    files: [ "**/*.html" ],
    rules: ANGULAR_TEMPLATE_RULES_PRESET,
    languageOptions: {
      globals: { ...globals.browser },
      parser: angularPlugin.templateParser
    }
  },
  {
    files: [
      "**/*.ts",
      "**/*.mts",
      "**/*.cts"
    ],
    processor: angularPlugin.processInlineTemplates,
    languageOptions: {
      parser: tseslintPlugin.parser,
      globals: { ...globals.browser },
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            ".vitepress/.vitepress/*",
            ".vitepress/.vitepress/theme/*"
          ]
        },
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: getAngularTsPreset({
      selectorPrefix: "ogs"
    })
  },
  {
    files: [
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs"
    ],
    rules: JS_RULES_PRESET
  },
  {
    files: [ "**/*.md" ],
    language: "@markdown/gfm",
    languageOptions: {
      frontmatter: "yaml"
    },
    rules: ESLINT_MARKDOWN_RULES
  },
  {
    files: [ "**/*.json" ],
    language: "@json/json",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.json5" ],
    language: "@json/json5",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.jsonc" ],
    language: "@json/jsonc",
    rules: ESLINT_JSON_RULES
  }
);
