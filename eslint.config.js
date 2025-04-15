import js from "@eslint/js";
import globals from "globals";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
// import reactThree from '@react-three/eslint-plugin';

import { defineConfig } from "eslint/config";
export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ['dist/*', 'node_modules/*', 'src/utils/metadata.tsx', 'src/utils/updateColorbar.tsx'],
    plugins: {
      js
    },
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
    extends: ["js/recommended"]
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        React: true
      }
    }
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  // reactThree.configs.recommended
]);