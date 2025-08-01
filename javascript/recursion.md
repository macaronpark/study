# 재귀 함수

## 개념

함수 내부에서 자기 자신을 호출하는 함수

```javascript
// 예: x를 n 제곱해 주는 함수 pow(x, n)
function pow(x, n) {
  if (n === 1) {
    return x; // 재귀의 기저(basis)
  }

  return x * pow(x, n - 1); // 재귀 단계(recursion step)
}
```

## 실행 컨텍스트와 스택

함수 내부에 중첩 호출이 있을 때 수행 절차

- 현재 함수 실행 중지
- 중지된 함수와 연관된 실행 컨텍스트는 `실행 컨텍스트 스택(execution context stack)` 이라는 특별한 자료 구조에 저장
- 중첩 호출 실행 > 완료
- `실행 컨텍스트 스택`에서 일시 중단했던 함수의 실행 컨텍스트를 꺼내옴
- 중단했던 함수 재실행

> [!NOTE]
>
> - 실행 컨텍스트는 메모리를 차지하므로 재귀를 사용할 땐 메모리 요구사항에 유의할 것
> - 메모리 절약이 필요하다면 반복문 기반 알고리즘이 하나의 실행 컨텍스트를 가지므로 고려 가능
> - 구현과 유지보수 측면에서는 반복문보다는 재귀가 쉬움

## 실습

### 팩토리얼 계산하기

- 팩토리얼(factorial)
  - n이 자연수일 때, `1`부터 `n`까지의 모든 자연수의 곱
  - n 팩토리얼은 `n!`으로 표시
- 재귀를 사용하여 n!을 계산하는 함수 작성

  ```javascript
  function factorial(n) {
    if (n === 1) return n;

    return n * factorial(n - 1);
  }

  console.log(factorial(1)); // 1
  console.log(factorial(2)); // 2
  console.log(factorial(3)); // 6
  ```

### 피보나치 수 계산하기

- 피보나치 수
  - 첫째와 둘째 항이 1이며 그 뒤의 항은 바로 앞 두항의 합인 수열
  - 1, 1, 2, 3, 5, 8, 13, 21 ...
- `n` 번째 피보나치 수를 반환하는 함수 작성

  ```javascript
  // 재귀: n이 커질 수록 연산이 많이 일어난다
  function fib(n) {
    if (n - 2 < 1) {
      return 1;
    }

    return fib(n - 1) + fib(n - 2);
  }

  // 반복문: 재귀보다 빠르고 중복이 없다
  function fib(n) {
    let a = 1;
    let b = 1;

    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    }

    return b;
  }
  ```
