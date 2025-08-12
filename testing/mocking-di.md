# Mocking vs Dependency Injection

모킹을 마지막 수단으로 두는 이유

- 가장 큰 이유는 "구현"이 아닌 "동작"을 테스트하기 위해서
  - 테스트가 구현에 너무 깊게 종속되어 추후 코드를 더 좋은 방식으로 리팩토링할 때, 겉으로 보이는 기능은 똑같지만 테스트는 실패 => 불필요한 테스트 수정 비용 발생. 리팩토링 주저하게 됨
  - 실제 환경을 모두 반영하지 못해 테스트는 통과하는데 실제로는 동작하지 않는 상황이 발생할 수 있음
  - 원하는 기능이 정상적으로 동작한다는 사실을 보장하지 못하고 특정 코드 동작만 보장

모킹을 사용하면 좋은 곳

- 제어할 수 없는 외부 의존성을 다룰 때
  - 네트워크 요청 (MSW)
  - 브라우저 API (window.location, localStorage, matchMedia)

모킹은

- 전역 객체 오염이 될 수 있음 (restore 누락 리스크)
- 병렬 테스트 시 예기치 못한 이슈를 발생시킬 수 있다
- `동작`보다 `구현`에 집중하는 테스트를 만든다
- 신뢰도가 낮다.

의존성 주입

- 전역 객체를 건들이지 않아 병렬 환경에서 간섭이 생기지 않음
- 전역 오염이 없어서 복구(mockRestore)를 깜빡하는 실수를 할 여지가 없다
- 테스트가 non flaky해짐
- 함수가 순수해짐 -> 예측 가능, 테스트와 유지보수 용이
- 내부 코드를 변경하지 않고 특정 기능을 하는 모듈을 갈아끼우기 쉽다

  - 예

    - 게임 밸런스 조정할 때 로직만 갈아끼울 수 있음
    - 버섯 랜덤 심기 함수에서 RNG 교체가 쉬워짐

    ```javascript
    import seedrandom from "seedrandom";
    const rng = seedrandom("fixed-seed");
    getRandomMushroomType(CONFIG, rng); // 항상 같은 시퀀스
    ```

## 참고

- [Google Testing Blog - Testing on the Toilet: Don’t Overuse Mocks](https://testing.googleblog.com/2013/05/testing-on-toilet-dont-overuse-mocks.html?utm_source=chatgpt.com)
