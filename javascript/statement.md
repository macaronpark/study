# 조건문, 반복문

## `if/else` vs `switch`

- `if/else`
  - 범위, 복잡한 조건, 논리 연산에 사용
- `switch`
  - fall-through: break를 만날 때까지 모든 case가 실행 됨
  - break 필수. return 사용하면 자동 종료
  - 정확한 비교, 많은 분기 시 사용

## `for...of` vs `for...in`

- `for...of`
  - 대상: 순회 가능한(iterable) 객체의 값(value)
  - 핵심 개념: 순회(iteration)
  - 작동 방식: Iterable Protocol, `Symbol.iterator`
  - 프로토타입: 프로토타입 체인 순회 O
- `for...in`
  - 대상: 객체의 키(key/index)
  - 핵심 개념: 열거 (enumeration)
  - 작동 방식: 속성의 `enumerable` 플래그
  - 프로토타입: 프로토타입 체인 순회 X
  - 주의: 배열에 사용 시 배열의 상속받은 속성까지 순회할 수 있어 위험

```javascript
const arr = ["a", "b", "c"];
const obj = { name: "Gemini", type: "AI" };

console.log("--- for...in with Array ---");
for (const key in arr) {
  console.log(key); // 1. 무엇이 출력될까
}

console.log("--- for...of with Array ---");
for (const value of arr) {
  console.log(value); // 2. 무엇이 출력될까
}

console.log("--- for...in with Object ---");
for (const key in obj) {
  console.log(key); // 3. 무엇이 출력될까
}

/*
console.log('--- for...of with Object ---');
for (const value of obj) { // 4. 에러가 발생하는 이유
console.log(value);
}
*/
```

- 문1
  - `for...in`은 배열의 index를 순회한다.
  - 출력: 0, 1, 2
- 문2
  - `for...of`는 배열의 value를 순회한다.
  - 출력: "a", "b", "c"
- 문3
  - `for...in`은 객체의 key를 순회한다.
  - 출력: "name", "type"
- 문4
  - `TypeError: obj is not iterable` 발생
  - `for..in`은 object의 key를 순회하는데, 왜 `for..of`는 object가 not iterable하다고 하면서 object의 value를 순회할 수 없을까?
    - 예상: for in은 내부적으로 obj의 key를 뽑아서 이터러블하게 만든다?. 하지만 for of는 그런 기능이 없다?
    - 내가 모르는 것: js의 array는 obj로 이루어져 있다. obj과 array의 다른 점은 잘 모름. 여기에 이유가 있지도 않을까?
    - 핵심 키워드: Iterable Protocol
    - 답: `for...of`가 호출할 Symbol.iterator가 plain object에는 없어서 obj is not iterable 에러가 발생함.

## `break` vs `continue`

- `break`: "탈출!"

  - 현재 실행 중인 반복문(for, while)이나 switch 문의 실행 자체를 완전히 중단하고, 해당 코드 블록 밖으로 제어권을 넘긴다.
  - 마치 비상 탈출 버튼처럼, 더 이상 뒤를 돌아보지 않고 바로 빠져나온다.

- `continue`: "이번 차례는 패스!"
  - 반복문 내에서만 사용.
  - 현재 진행 중인 이번 순회(iteration)만 즉시 멈추고, 코드 블록의 나머지 부분을 건너뛴 후, 다음 순회로 바로 넘어간다.
  - 반복문 자체를 멈추지는 않는다.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log("---break---");
  console.log(i); // 0, 1, 2, 3, 4
}

for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log("---continue---");
  console.log(i); // 1, 3, 5, 7, 9
}
```

## 참고

- [if와 '?'를 사용한 조건 처리](https://ko.javascript.info/ifelse)
- [switch문](https://ko.javascript.info/switch)
- [while과 for 반복문](https://ko.javascript.info/while-for)
