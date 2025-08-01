- [함수 선언문, 함수 표현식, 화살표 함수](#함수-선언문-함수-표현식-화살표-함수)
  - [호이스팅 동작의 차이](#호이스팅-동작의-차이)
  - [함수 이름의 유무](#함수-이름의-유무)
  - [참고](#참고)

# 함수 선언문, 함수 표현식, 화살표 함수

```javascript
// 함수 선언문(Function Declaration)
function add(a, b) {
  return a + b;
}
```

```javascript
// 함수 표현식(Function Expression)
const addTwoNumbers = function add(a, b) {
  return a + b;
};
```

```javascript
// 화살표 함수(Arrow Function)
const add = (a, b) => {
  return a + b;
};
```

## 호이스팅 동작의 차이

- 선언문: 함수 선언 전체가 렉시컬 환경에 등록되므로, 선언 전 호출할 수 있다.
- 표현식, 화살표: 렉시컬 환경에 const 변수 선언만 등록이 되고 값인 함수가 초기화 되지 않으므로 선언 전 호출할 수 없다.

## 함수 이름의 유무

- 선언문: 이름이 반드시 필요하다.
- 표현식: 선택적으로 사용할 수 있다. 사용하는 경우 함수 내부에서만 호출할 수 있다.
- 화살표: 이름을 사용할 수 없다.

## 참고

- [모던 JavaScript 튜토리얼: 함수 선언문 vs 함수 표현식](https://ko.javascript.info/function-expressions)
- [모던 JavaScript 튜토리얼: 화살표 함수 기본](https://ko.javascript.info/arrow-functions-basics)
- [모던 JavaScript 튜토리얼: 화살표 함수 심화](https://ko.javascript.info/arrow-functions)
