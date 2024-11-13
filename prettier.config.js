/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions & import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
export default {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^~/", "^[.][.]/", "^[.]/"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.6.3",
};
