- flex 와의 차이점

  - flex: 1차원 흐름 제어
  - grid: 2차원 흐름 제어
  - 1차원, 2차원?
    - 공간의 차원을 나타내는 개념
    - 1차원: 선과 같이 한 방향으로만 움직일 수 있는 공간
    - 2차원: 면과 같이 두 개의 방향(가로, 세로)으로 움직일 수 있는 공간을 의미

![Grid terminology](https://webkit.org/wp-content/uploads/grid-concepts.svg)

- `fr`단위
  - 그리드 컨테이너에 남아있는 사용 가능한 공간을 공유하는 단위
  ```
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  ```
