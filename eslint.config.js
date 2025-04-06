import eslint from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import astroEslintParser from 'astro-eslint-parser'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],

  // Prettierとの統合
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      'prettier/prettier': 'error',
      // Prettierと競合するルールをオフに
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off'
    }
  },

  // importの順序付け
  {
    plugins: {
      import: eslintPluginImport
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'import/first': 'error',
      'import/no-duplicates': 'error'
    }
  },

  // グローバル設定と基本ルール
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // セミコロン省略スタイル
      semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
      'semi-spacing': ['error', { after: true, before: false }],
      'semi-style': ['error', 'first'],
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',

      // セキュリティ関連のルール
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',

      // コード品質の向上
      'max-len': [
        'warn',
        { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }
      ],
      complexity: ['warn', { max: 10 }],

      // パフォーマンス最適化
      'no-await-in-loop': 'warn',

      // エラー防止ルール強化
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'warn'
    }
  },

  // Astroファイル設定
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    }
  },

  // JS/JSX/Astroファイル設定
  {
    files: ['**/*.{js,jsx,astro}'],
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs']
    }
  },

  // TypeScript設定
  {
    files: ['**/*.{ts,tsx}', '**/*.astro/*.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd()
      }
    },
    rules: {
      // 基本的なTypeScriptルール
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/triple-slash-reference': 'off',

      // TypeScriptの厳格化
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',

      // 追加のTypeScriptルール
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn'
    }
  },

  // 除外ディレクトリ/ファイル
  {
    ignores: [
      'dist',
      'node_modules',
      '.github',
      'types.generated.d.ts',
      '.astro',
      '.vscode',
      'public'
    ]
  }
]
