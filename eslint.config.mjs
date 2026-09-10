import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** ESLint 9 flat config (eslint-config-next 16 ships native flat configs). */
const config = [
  { ignores: ["node_modules/**", "out/**", ".next/**", "node_modules.trash/**"] },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Contract types are string unions — no `any` allowed (AGENTS.md).
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default config;
