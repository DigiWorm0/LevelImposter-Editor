import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default [
    // Recommended rules
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["node_modules/*", "build/*"],
        plugins: {
            "@stylistic": stylistic
        },
        rules: {
            "@stylistic/semi": ["warn", "always"],
            "@stylistic/quotes": ["warn", "double"],
            "@stylistic/indent": ["warn", 4],
            "@typescript-eslint/no-explicit-any": ["off"],
        }
    }
];