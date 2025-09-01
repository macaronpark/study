# Package manager <!-- omit from toc -->

- [npm vs yarn vs pnpm](#npm-vs-yarn-vs-pnpm)
  - [선택 기준](#선택-기준)
  - [설치 속도](#설치-속도)
  - [호이스팅 문제](#호이스팅-문제)
- [Corepack](#corepack)
- [nvm(Node Version Manager)](#nvmnode-version-manager)
- [pnpm](#pnpm)
  - [패키지 관리](#패키지-관리)
    - [`pnpm install` (`pnpm i`)](#pnpm-install-pnpm-i)
    - [`pnpm add`](#pnpm-add)
  - [스크립트 실행](#스크립트-실행)
    - [`pnpm dlx` (`pnpx`)](#pnpm-dlx-pnpx)
    - [`pnpm exec`](#pnpm-exec)

<br>

패키지 설치, 관리 도구. 패키지별 의존성을 자동으로 정확하게 관리해주므로 편하게 사용할 수 있다.

<br>

## npm vs yarn vs pnpm

### 선택 기준

- npm
  - 빠른 시작(node.js의 기본 패키지 매니저)
  - 호환성 넓음(node_modules 형식)
- pnpm
  - 엄격한 레이아웃으로 **유령 의존성 방지**하므로 모노레포에 사용하기 좋음
  - 전역 스토어 + 하드링크로 설치 빠르고 디스크 공간 절약
  - [Next.js의 학습 문서](https://nextjs.org/learn/dashboard-app/getting-started#creating-a-new-project)에서 pnpm을 추천
    > We recommend using pnpm as your package manager, as it's faster and more efficient than npm or yarn.
- yarn PnP(Zero-installs)
  - **설치 스킵/재현성** 최고
    - 단일 환경이 아니라 여러 환경에서 개발, 빌드, 실행할 때 빛을 발함
  - 새 의존성 추가·네이티브 모듈에는 설치 필요
  - 호환성 점검 필요 (예: node_modules 형식을 요구하는 툴을 사용하는 경우)

### 설치 속도

중복된 파일을 계속 새로 write하냐, 이미 있는 걸 참조만 하냐의 차이가 있음

- npm: **node_modules에 새로 풀어쓰는 구조적 한계 = 느림**
  - OS가 파일 생성/쓰기(IO)하는 비용이 큼
  - 프로젝트 개수 \* 의존성 개수만큼의 파일 생성
- pnpm: **중복 파일 생성/복사하지 않는 하드링크 = 빠름**
  - 처음 레지스트리에서 다운, 압축 해제 후 전역 스토어에 저장
  - node_modules/ 안에 하드링크 만들어서 전역 스토어를 가리킴
- yarn PnP: **복사조차 안 함 = 더 빠름**
  - 최초 패키지 다운 시 zip 파일 그대로 .yarn/cache에 두고 git commit
    - 의존성이 커질수록 레포 크기 커짐
  - 이후 브랜치 변경해도 설치 과정 필요 없음
  - 필요할 때 .pnp.cjs 로더가 zip 안에서 직접 읽음

### 호이스팅 문제

공통 의존성을 루트로 끌어올려서 설치 최적화를 노리지만, 의존성 해석이 비결정적이 되어 예측 불가능한 문제가 생김

- npm (classic), yarn v1: **호이스팅 구조적 한계 = 불안정**
  - 설치하면 node_modules/ 안에 폴더 구조를 만들어서 의존성을 풀어둠
  - 호이스팅(hoisting) 때문에, 의존성이 루트 node_modules로 끌어올려짐
  - 장점: 중복 제거
  - 단점: 어떤 패키지가 lodash를 직접 의존하지 않아도, 루트에 있으면 "import lodash"가 운 좋게 동작하는 **phantom dependencies(유령 의존성)** 문제 발생
- pnpm: **엄격한 node_modules 레이아웃 = 더 안정적**
  - 직접 의존성만 루트에 symlink → 선언 안 한 의존성은 못 씀 → 더 엄격하고 안정적
  - 필요시 옵션(shamefully-hoist, public-hoist-pattern)으로 호이스팅 제어 가능
- yarn PnP: **node_modules 제거 = 완전 안정적**
  - 의존성 매핑을 .pnp.cjs 로더 파일에 기록
  - 선언하지 않은 의존성은 무조건 에러 → "우연히 되는" 상황 원천 차단
  - zip 캐시 + 로더로만 접근하므로 충돌 없음ㅊ

<br>

## Corepack

- 문제
  - 전역으로 특정 패키지 매니저의 특정 버전을 설치해서 사용하는 경우,
  - CI등 다른 환경에서 다른 패키지 버전을 사용하게 될 경우 호환성 문제가 발생한다
- 해결
  - node.js에서 제공하는 corepack 기능은 package.json에 고정 명시된 패키지 매니저와 버전을 읽어, 필요 시 자동으로 다운로드(캐시)하고 실행한다
  - 사용자가 수동으로 전역 설치, 업그레이드하지 않아도 자동 설치 후 실행된다
- 사용법
  - node.js 14.19 / 16.9 이상 버전에서 기본 제공
  - `corepack enable` (한 번만)
    - 아직 실험 기능이라 기본으로 활성화되어 있지 않음
    - 사용자가 직접 활성화(opt-in)해야 함
  - package.json에 패키지 매니저와 버전 명시
    - 버전 범위(^, ~, latest)는 금지 — 정확한 버전만 허용
    ```json
    {
      "packageManager": "pnpm@9.10.0"
    }
    ```
  - 평소처럼: pnpm install → 자동 다운로드, 캐시, 실행

<br>

## nvm(Node Version Manager)

- node.js 버전을 관리해주는 도구
- 맥이나 리눅스에서 여러 node.js 버전을 쉽게 설치하고, 바꿔가며 사용할 수 있음
  - 프로젝트마다 요구하는 버전이 다를 경우 바꿔가며 사용 필요
- nvm vs brew/apt
  - brew/apt: 한 버전만 깔아두고 사용
  - nvm: **필요할 때마다 버전 스위치 가능**

<br>

## pnpm

### 패키지 관리

#### `pnpm install` (`pnpm i`)

- 작동 방식
  - `pnpm-lock.yml`에 기록된 버전을 우선적으로 설치
    - 팀원과 매번 같은 버전을 설치하기 위해서는 `pnpm-lock.yml`을 커밋해야 함
  - 없다면 `package.json`의 버전 범위(`^`, `~`, `*` 등)에 맞춰 새 버전을 찾음
  - 찾은 결과를 다시 `pnpm-lock.yml`에 기록

#### `pnpm add`

- Options
  - `--save-dev`(`-D`)
    - `pnpm add`로 패키지를 설치하는 방식은 두 가지가 있음
      - (1) dependencies
        - 실제 앱이 런타임(프로덕션 실행)에 필요한 라이브러리
        - 예: `next.js`, `react`, `axios`
      - (2) devDependencies
        - 개발할 때만 필요한 툴, 빌드 시점 도구, 테스트 라이브러리
        - 예: `prettier`, `eslint`, `vitest`, `vite`
  - `--save-exact`(`-E`)
    - 설치할 때 지정된 버전 그대로 package.json에 기록함
    - **버전에 따라 포맷 결과가 달라질 수 있기 때문에** 이 옵션을 사용하여 고정
    - 옵션을 사용하지 않으면
      - `"prettier": "^3.3.3"`와 같이 캐럿(^) 버전이 기록됨
      - `pnpm update` 시, `3.x.x` 범위 안에서 최신 패치/마이너 버전을 자동으로 설치할 수 있다는 뜻

### 스크립트 실행

#### `pnpm dlx` (`pnpx`)

- npm의 `npx`와 같은 역할을 하는 명령어
- 패키지를 **설치하지 않고도, 임시로 실행**할 수 있게 해줌
  - 전역으로 설치 안함
  - 프로젝트 디펜던시로 설치 안함
- 동작 방식
  - pnpm dlx <패키지명> 을 실행하면
  - (1) 해당 패키지를 캐시에 설치
  - (2) 지정된 실행 파일(bin) 실행
  - (3) 실행이 끝나면 필요에 따라 캐시된 파일을 정리

#### `pnpm exec`

- **프로젝트에 설치된 의존성들의 실행 파일(bin)을 바로 실행**할 수 있음
- 예: 프로젝트 디펜던시로 jest를 설치했다면 jest를 전역으로 설치할 필요없이 `pnpm exec jest`로 실행 가능
