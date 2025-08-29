# tsconfig.json <!-- omit from toc -->

타입스크립의 컴파일러(tsc)의 설정 파일

- [Root](#root)
- [Compiler Options](#compiler-options)
- [용어](#용어)

<br >

## Root

- `include`
  - 대상이 될 파일명 또는 패턴
- `exclude`
  - **`include` 중에서 제외할** 파일명 또는 패턴
  - exclude에 걸려도, 코드에서 import하면 포함될 수 있음

## Compiler Options

- `target`
  - TS를 어떤 JS 버전으로 출력할지 지정
- `lib`
  - `target`에 따라 자동으로 정해짐
  - `lib`을 명시하면 **기본값을 전부 대체**하므로 필요한 걸 모두 명시해줘야 함
- `module`
  - 컴파일 결과 JS의 모듈 형태
  - 'esnext' => ESM 구문
- `jsx`
  - TS가 .tsx 파일을 JS로 변환할 때, JSX를 어떤 형태로 내보낼지 지정
  - 'preserve' => jsx를 그대로 남겨둠(후속 단계 도구가 변환하도록)
  - next.js는 TS 변환을 tsc가 아닌 SWC가 담당. 그래서 TS 단계에서는 JSX를 건들이지 않고 남겨두고 SWC가 최적화된 방식으로 변환하도록 함
- `strict`
  - 타입을 엄격하게 검사하는 옵션 묶음을 한 번에 켤 수 있음. 필요 시 개별 옵션만 끌 수 있음
- `noUncheckedIndexedAccess`

  - 인덱스로 읽는 값이 항상 undefined일 수 있다고 간주
  - 인덱스 시그니처/배열 접근은 T가 아닌 `T | undefined`로 봄
  - undefined 가능성을 안전하게 처리하려는 의도

    ```ts
    type Env = {
      NAME: string;
      OS: string;
      [key: string]: string; // 인덱스 시그니처
    };

    declare const env: Env;

    const a = env.NAME; // string (명시된 키)
    const b = env["NODE_ENV"]; // string | undefined (모르는 키)
    ```

- `exactOptionalPropertyTypes`
  - 속성을 아예 생략해도 된다는 뜻이지 undefined를 할당해도 된다는 뜻이 아님을 명시
  - undefined 대입을 허용하고 싶으면 타입에 `| undefined` 명시 필요
- `useUnknownInCatchVariables`
  - `try { ... } catch (e) { ... }`의 e 타입을 `any` 대신 `unknown`으로 간주
  - 기본 `any`는 오류 핸들링 코드에서 타입 안정성을 잃게 만듦. `unknown`은 먼저 확인하고 쓰라는 신호라 더 안전함
- `skipLibCheck`
  - 빌드/타입 체크 시,
    - `*.d.ts` 선언 파일의 내부 타입 체크 안함 => 에러 무시
    - 선언 파일 자체의 에러는 알 수 없지만 속도 빨라짐 => 큰 레포에서 체감 속도 높아짐
    - 소스 코드에서 타입을 사용하는 부분은 계속 검사하고 에러도 발생

## 용어

- **컴파일러**
  - A 언어/표현을 B 언어/표현으로 변환하는 프로그램
  - 동일 수준의 언어로 바꾸는 source-to-source 컴파일러(=트랜스파일러)도 포함
  - 예
    - TypeScript -> JavaScript
    - Babel: ESNext -> ES5
- **브라우저/Node의 JS 엔진**
  - 런타임에 JS를 기계어로 바꿔 실행(= 실행 시점에 기계어로 컴파일)
- **tsc**
  - 타입스크립트 컴파일러
  - 역할
    - (1) **TS를 JS로 변환(emit/transpile)**: 타입 구문을 제거하고 JS 파일 출력. 설정에 따라 JS 파일 출력 생략 가능
    - (2) **타입 검사(type-check)**: 타입 오류 알림
- **SWC**
  - next.js의 컴파일러로, TS -> JS 변환 담당
  - **next.js에서 tsc는 타입 체크만 수행**함
    - `"noEmit": true`
- **ESM(ECMAScript Modules)**
  - 표준 모듈 시스템
  - `import`/`export` 문법 사용
  - 정적 구조라 번들러의 트리 셰이킹 유리
- **CommonJS(CJS)**
  - Node 전통 모듈 시스템
  - `require`/`module.exports` 문법 사용
  - 동기 로딩 기반이라 브라우저 직사용 어렵고, 정적 분석이 힘들어 트리 셰이킹에 불리함
