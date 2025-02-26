import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const possibleTags = [
  "@deprecated",
  "@example",
  "@param",
  "@returns",
  "@see",
  "@maximum",
  "@minimum",
  "@description",
  "@default",
  "@since",
  "@version",
  "@throws",
  "@optional",
  "@type",
  "@minItems",
  "@minLength",
  "@maxLength",
  "@property",
  "@required",
  "@format",
  "@constant",
  "@constructor",
  "@security",
  "@enum",
  "@implements",
  "@instance",
  "@interface",
  "@component",
  "@summary",
  "@remarks",
  "@template",
  "@module",
];

const config: Config = {
  title: "Expensify app Documentation",
  tagline: "Documentation for Expensify app",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/expensify/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "expensify", // Usually your GitHub org/user name.
  projectName: "expensify", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "docs",
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Expensify",
      items: [
        {
          type: "docSidebar",
          sidebarId: "appSidebar",
          position: "left",
          label: "Docs",
          to: "/docs",
        },
        {
          to: "/docs/api",
          label: "Backend",
          position: "left",
        },
        {
          to: "/docs/app",
          label: "Frontend",
          position: "left",
        },
        {
          href: "https://github.com/Lenivaya/expensify",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Expensify. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          expensify: {
            specPath: "../expensify-backend/openapi-spec.yaml",
            outputDir: "docs/expensify",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",

      // Options
      {
        id: "typedoc-backend",
        entryPoints: ["../expensify-backend/src/**/*.ts"],
        tsconfig: "../expensify-backend/tsconfig.json",
        out: "./docs/api",
        // Add these options to control what gets included
        externalPattern: ["**/node_modules/**"],
        excludeExternals: true,
        excludeInternal: true,
        excludePrivate: true,
        excludeProtected: true,
        disableSources: true,
        skipErrorChecking: true,
        // Exclude test and spec files
        exclude: [
          "**/main.ts", // Root main.ts
          "**/*main.ts", // Files ending with main.ts
          "**/*.main.ts", // Files with .main.ts extension
          "**/main.*.ts", // Files starting with main
          "**/*.spec.ts",
          "**/*.test.ts",
          "**/tests/**",
          "**/__tests__/**",
        ],
        // Customize output
        readme: "none",
        sort: ["source-order"],
        // Enable JSDoc comment processing
        includeVersion: false,
        commentStyle: "jsdoc",
        jsDocCompatibility: true,
        preserveAnchorCasing: true,
        suppressCommentWarningsInDeclarationFiles: true,
        // Additional settings to help with structure while preserving JSDoc
        blockTags: possibleTags,
        categorizeByGroup: true,
        categoryOrder: [
          "Controllers",
          "Services",
          "Models",
          "Interfaces",
          "Types",
          "*",
        ],
        cleanOutputDir: true,
        groupOrder: [
          "Classes",
          "Interfaces",
          "Functions",
          "Variables",
          "TypeAliases",
          "*",
        ],
        plugin: ["typedoc-plugin-markdown"],
      },
    ],
    [
      "docusaurus-plugin-typedoc",

      // Options
      {
        id: "typedoc-app",
        entryPoints: ["../expensify-frontend/**/*.{tsx,ts}"],
        tsconfig: "../expensify-frontend/tsconfig.json",
        out: "./docs/app",
        // Add these options to control what gets included
        externalPattern: ["**/node_modules/**"],
        excludeExternals: true,
        excludeInternal: true,
        excludePrivate: true,
        excludeProtected: true,
        disableSources: true,
        skipErrorChecking: true,
        // Exclude test and spec files
        exclude: [
          "**/main.ts", // Root main.ts
          "**/*main.ts", // Files ending with main.ts
          "**/*.main.ts", // Files with .main.ts extension
          "**/main.*.ts", // Files starting with main
          "**/*.spec.ts",
          "**/*.test.ts",
          "**/tests/**",
          "**/__tests__/**",
          "**/.storybook/**",
          "**/next/**",
          "**/stories/**",
          "**/app/**",
          "**/public/**",
          "**/lib/api/**",
          "**/next.config.ts",
          "**/eslint.config.mjs",
          "**/postcss.config.mjs",
          "**/env.ts",
          "**/next-env.d.ts",
        ],
        // Customize output
        readme: "none",
        sort: ["source-order"],
        // Enable JSDoc comment processing
        includeVersion: false,
        commentStyle: "jsdoc",
        jsDocCompatibility: true,
        preserveAnchorCasing: true,
        suppressCommentWarningsInDeclarationFiles: true,
        // Additional settings to help with structure while preserving JSDoc
        blockTags: possibleTags,
        categorizeByGroup: true,
        categoryOrder: [
          "Controllers",
          "Services",
          "Models",
          "Interfaces",
          "Types",
          "*",
        ],
        cleanOutputDir: true,
        groupOrder: [
          "Classes",
          "Interfaces",
          "Functions",
          "Variables",
          "TypeAliases",
          "*",
        ],
        plugin: ["typedoc-plugin-markdown"],
      },
    ],
  ],

  themes: [
    "docusaurus-theme-openapi-docs",
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        // language: ["en", "zh"],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      },
    ],
  ],
};

export default config;
