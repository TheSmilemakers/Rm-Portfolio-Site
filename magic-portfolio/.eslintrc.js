module.exports = {
  extends: [
    "next/core-web-vitals",
    "next/typescript"
  ],
  rules: {
    // Code Quality Rules - Magic Portfolio Standards
    "complexity": ["error", 10],
    "max-lines-per-function": ["error", { "max": 100 }],
    "max-params": ["error", 4],
    "max-depth": ["error", 4],
    
    // TypeScript Rules
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    
    // React/Next.js Rules
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    
    // Import Rules
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external", 
        "internal",
        "parent",
        "sibling",
        "index"
      ],
      "newlines-between": "always"
    }],
    
    // General Code Quality
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "no-unused-expressions": "error",
    "prefer-const": "error",
    
    // Security Rules
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-script-url": "error",
    
    // Performance Rules  
    "no-await-in-loop": "warn",
    "require-await": "error"
  },
  
  // Environment Configuration
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  
  // Parser Configuration
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  
  // Ignore Patterns
  ignorePatterns: [
    "node_modules/**",
    ".next/**",
    "dist/**",
    "build/**",
    "public/**",
    "*.config.js",
    "*.config.mjs"
  ]
};