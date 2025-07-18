- [var, let, const](#var-let-const)
  - [차이점](#차이점)
  - [실행 컨텍스트 관점에서](#실행-컨텍스트-관점에서)
- [참고](#참고)

# var, let, const

## 차이점

| 키워드  | 스코프    | 재선언 | 재할당 | 호이스팅 | 초기화    | 선언 전 접근 시       |
| ------- | --------- | ------ | ------ | -------- | --------- | --------------------- |
| `var`   | 함수/전역 | O      | O      | O        | undefined | `undefined` 반환      |
| `let`   | 블록      | X      | O      | O        | ❌ (TDZ)  | `ReferenceError` 발생 |
| `const` | 블록      | X      | X      | O        | ❌ (TDZ)  | `ReferenceError` 발생 |

## 실행 컨텍스트 관점에서

자바스크립트 코드는 실행 전 두 단계를 거친다.

1. 컴파일 (실행 컨텍스트 생성)
2. 런타임

실행 컨텍스트에서 변수 선언은 렉시컬 환경에 저장된다. 렉시컬 환경은 두 파트로 구성되는데 (1) 변수, 함수 선언을 저장하는 곳(Environment Record)과 (2) 외부 렉시컬 환경을 참조하는 곳(Outer Lexical Environment Reference)으로 구성된다.

```javascript
console.log(a); // undefined
console.log(b); // reference error
console.log(c); // reference error

var a = 1;
let b = 2;
const c = 3;
```

var는 환경 레코드에 선언을 저장하며 동시에 undefined로 초기화한다. 그래서 선언 이전에 접근하면 undefined가 출력된다. 런타임 단계에서 값이 할당되면 메모리에 바인딩 된다.

let, const는 선언을 저장하되(변수 슬롯은 있지만) 초기화하지는 않는다. 그래서 선언 이전에 접근하면 reference error: 초기화 전에 접근할 수 없다는 에러가 발생한다. 런타임 단계에서 값이 할당되면서 초기화되기 전까지는 TDZ(Temporal Dead Zone)에 있게 된다.

환경 레코드와 TDZ의 관계: 환경 레코드에 선언만 등록되고 값 정보가 작성되지 않은 상태(let, const의 binding만 존재하고 초기화 되지 않은 상태), 즉 메모리 할당을 받지 않은 상태가 TDZ라고 할 수 있겠다.

실행 컨텍스트가 여러 개 쌓이는 경우, 함수가 중첩 호출되는 경우 변수의 유효 범위를 파악할 수 있도록, 함수가 생성될 때 생성된 곳의 렉시컬 환경을 참조하게 되는데 이 정보는 렉시컬 환경의 구성 요소 중 하나인 outer 참조를 저장하는 곳에 저장을 한다. 이 정보를 통해 중첩된 함수의 경우 특정 변수의 유효 범위를 판단할 수 있다. 이게 스코프 체인의 핵심 작동 원리이다.

```javascript
const a = 1;

function foo() {
  const c = 3;
  console.log(a); // 1 (전역 스코프)
  console.log(b); // reference error (선언되지 않음)

  if (true) {
    const b = 2;
    console.log(a); // 1 (전역 스코프)
    console.log(b); // 2
    console.log(c); // 3
  }

  console.log(b); // reference error (블록 스코프 밖)
}
```

# 참고

- [변수와 상수](https://ko.javascript.info/variables)
- [오래된 var](https://ko.javascript.info/var)
- [변수의 유효범위와 클로저](https://ko.javascript.info/closure)
