# Prettier <!-- omit from toc -->

- [설치](#설치)
- [`.prettierrc`](#prettierrc)
- [prettier-plugin-tailwindcss](#prettier-plugin-tailwindcss)
- [eslint-config-prettier](#eslint-config-prettier)
- [CLI](#cli)

<br>

## 설치

```shell
pnpm add --save-dev --save-exact prettier

node --eval "fs.writeFileSync('.prettierrc','{}\n')"
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```

- `--save-exact`
  - [prettier 문서](https://prettier.io/docs/install#summary)에서 정확한 버전으로 설치하도록 권장
    > Install an exact version of Prettier locally in your project.
  - `^` 버전으로 설치하면 팀원마다 다른 마이너/패치 버전을 사용할 가능성 생김
  - prettier는 패치 버전 차이만 나도 포맷 결과가 달라질 수 있음

<br>

## `.prettierrc`

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

<br>

## [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```shell
pnpm add -D prettier-plugin-tailwindcss
```

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

<br>

## [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation)

- ESLint와 Prettier는 일부 규칙이 겹침
- 포맷과 관련된 ESLint 규칙을 꺼서 Prettier랑 충돌하지 않게 함

```shell
pnpm add -D eslint-config-prettier
```

```js
// eslint.config.mjs
import someConfig from "some-other-config-you-use";
// Note the `/flat` suffix here, the difference from default entry is that
// `/flat` added `name` property to the exported object to improve
// [config-inspector](https://eslint.org/blog/2024/04/eslint-config-inspector/) experience.
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [someConfig, eslintConfigPrettier];
```

<br>

## CLI

- `prettier . --check`
- `prettier . --write`
