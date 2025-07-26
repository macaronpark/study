# 클로저

클로저는 함수가 생성될 당시의 렉시컬 환경을 기억하여, 외부 함수의 변수에 계속 접근할 수 있는 함수이다.

- lexical의 의미
  - 어휘적인 = 코드가 작성된, 문법적인 위치에서 결정된
  - 변수와 함수의 유효 범위(Scope)가 코드가 쓰여진 위치(정적 구조)에 따라 결정되기 때문에 “Lexical”이라는 용어 사용

## 실행 컨텍스트와 스코프 체인

```javascript
function outer() {
  const outerVar = "I am outer";

  function inner() {
    console.log(outerVar); // 외부 스코프의 변수에 접근
  }

  return inner;
}

const closureFunction = outer();
closureFunction(); // "I am outer" - outer 함수가 종료되었는데도 접근 가능
```

- 함수는 자신의 렉시컬 환경에서 먼저 변수와 함수를 찾는다.
- inner 함수가 outerVar를 참조하고 있기 때문에, outer 함수의 렉시컬 환경 중 필요한 변수들은 가비지 컬렉터에 의해 수거되지 않고 유지된다.

- **실행 컨텍스트 스택 과정**
  - 전역 실행 컨텍스트 생성 → 스택에 push
  - outer() 호출 → outer 실행 컨텍스트 생성 → 스택에 push
  - outer 종료 시 실행 컨텍스트는 스택에서 pop되지만, 반환된 inner 함수는 클로저로 남아 메모리에 유지된다.
  - closureFunction()을 호출할 때 inner 함수의 실행 컨텍스트가 새로 생성되어 스택에 push된다.
  - inner 종료 → 스택에서 pop
  - 전역만 남음
- **스코프 체인 형성**
  - inner의 외부 렉시컬 환경 → outer
  - outer의 외부 렉시컬 환경 → 전역
  - 변수 찾을 때: inner → outer → 전역 순으로 체인을 따라 탐색

## 예제

```javascript
// 문제가 있는 코드
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3 출력
  }, 100);
}

// 해결책 1: 즉시실행함수(IIFE)
for (var i = 0; i < 3; i++) {
  (function (index) {
    setTimeout(function () {
      console.log(index); // 0, 1, 2 출력
    }, 100);
  })(i);
}

// 해결책 2: let 사용
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2 출력
  }, 100);
}
```

- 문제 원인
  - var는 블록 스코프가 아닌 함수/전역 스코프
  - 비동기 setTimeout이 실행되는 시점에는 for 루프가 모두 종료되고 i가 3이 되어있음
  - 모든 콜백 함수가 동일한 `i`를 참조해 3이 출력됨
- 해결책 1: 즉시실행함수(IIFE)
  - 새로운 스코프 생성
  - 루프가 도는 시점의 `i`값을 복사해서 넘겨받은 `index` 변수 참조
- 해결책 2: let 사용
  - let은 블록 스코프임
  - for 루프 `{ }` 블록을 순회할 때마다 새로운 렉시컬 환경이 생성됨

## 개발자 도구 활용

// TODO

1. 브라우저 개발자 도구에서 스코프 탭을 보면서 클로저가 어떻게 형성되는지 확인해볼 수 있다고 하는데 예제 코드와 구체적인 확인 방법
2. 클로저는 메모리를 계속 참조하니까 필요없을 때는 참조를 끊어줘야 한다던데 실제 메모리 현황에서 참조를 끊어줘야하는 클로저를 식별하는 예제 코드와 구체적인 방법
