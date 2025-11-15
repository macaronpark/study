# 연산자 <!-- omit from toc -->

- [용어](#용어)
- [연산자 우선순위](#연산자-우선순위)
- [Falsy, Truthy](#falsy-truthy)
- [Logical operator](#logical-operator)
- [Assignment(`=`) operator](#assignment-operator)
- [참고](#참고)

<br>

## 용어

- 피연산자(Operand)
  - 연산자의 대상이 되는 항
- 단항 연산자
  - 하나의 항을 대상으로 하는 연산자.
  - `-` 부호 반전
  - `+` 숫자 변환
  - `!` Boolean값 반전
  - `typeof` 자료형을 문자열로 반환
  - `delete` 객체의 프로퍼티 삭제
  - `++`, `--` 증가, 감소 연산. 전위/후위에 따라 값 반환 순서가 다르다.
- 이항 연산자
  - 두개의 항을 대상으로 하는 연산자.
  - `%` 두 항을 나눈 후 나머지 반환
  - `**` 거듭제곱 연산.

<br>

## 연산자 우선순위

- 단항 연산자의 우선순위가 이항 연산자의 우선순위보다 높다.
- `( )` 를 사용해 우선순위를 높일 수 있다.

<br>

## Falsy, Truthy

- falsy
  - `false`
  - `0`, `-0`
  - `0n` (BigInt zero)
  - `""` (빈 문자열)
  - `null`
  - `undefined`
  - `NaN`
- truthy
  - `{}`
  - `[]`
  - `"0"`
  - `"false"`
  - `() => {}`

<br>


## Logical operator

- Logical OR(`||`)
  - 왼쪽부터 처음 등장하는 truthy 값을 그대로 반환
  - 모두 falsy면 마지막 피연산자 반환
- Logical AND(`&&`)
  - 왼쪽부터 처음 등장하는 falsy 값을 그대로 반환
  - 모두 truthy면 마지막 피연산자 반환
- 예
  - `0 && "A" || "B"` => B
  - `(0 || ("A" && "B")) ?? "C"` => B
  - `(("") ?? "K") && (false || (null ?? []))` => ""

<br>

## Assignment(`=`) operator

- 할당 연산자는 할당된 값을 반환
  ```js
  let a = 1
  a = 4 // This expression returns 4
  ```
  - This is what makes chaining assignment possible.
    ```js
    let x, y, z
    x = y = z = 10
    ```

<br>

## 참고

- [모던 JavaScript 튜토리얼: 기본 연산자와 수학](https://ko.javascript.info/operators)
