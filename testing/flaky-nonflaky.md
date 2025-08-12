# Flaky test vs. Non-flaky test

## Flaky test

- 깨지기 쉬운 테스트
  - 어떨 땐 통과하고 어떨 땐 깨지는 테스트
  - 이 환경에서는 통과하고 저 환경에서는 깨지는 테스트
- 재현성이 없고 결과가 불안정
- 유발 원인
  - 현재 시간 `Date().now`
  - `Math.random()` 같은 난수
  - 네트워크 지연, 외부 API 의존
  - 비동기 race condition

## Non-flaky test

- 항상 동일한 결과를 보장하는 테스트
- 재현 가능하고 결과가 안정적
- 구현 방법
  - 난수, 시간, 외부 API 등 변수를 제어(mock, stub, 의존성 주입)
  - 테스트 데이터 고정
  - 동시성/비동기 흐름을 결정적으로 만들기
