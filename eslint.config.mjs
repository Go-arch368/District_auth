import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = {
  extends: [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    "eslint:recommended",
    "next",
    "next/core-web-vitals",  // Note: This is duplicated from the compat.extends
    "prettier"
  ],
  "plugins":["prettier"],
  "rules":{
    "prettier/prettier":"error"
  }
};
export default eslintConfig;
