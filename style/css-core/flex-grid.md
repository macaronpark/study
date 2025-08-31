# Flex와 Grid <!-- omit from toc -->

- [Flex](#flex)
  - [`justify-content`와 `align-items`의 차이점](#justify-content와-align-items의-차이점)
- [Grid](#grid)
  - [`flex`와의 차이점](#flex와의-차이점)
  - [`fr`단위](#fr단위)

<br>

## Flex

### `justify-content`와 `align-items`의 차이점

- flexbox에는 두 가지 축이 있다.
  - (1) **main axis** - `flex-direction`으로 설정된 방향인 주축
  - (2) **cross axis** - 주축과 직각인 교차축
- `justify-content`
  - 주축을 기준으로 아이템 "전체 그룹(덩어리)" 정렬
  - 예: 컨테이너 안에서 아이템들을 시작·끝·중앙·균등분배 등으로 배치
- `align-items`
  - 교차축을 기준으로 개별 아이템 정렬
  - 예: 한 줄/셀 안에서 아이템들을 위·아래·중앙·늘리기 등으로 정렬

<br>

![justify-*, align-* 속성 설명](https://i.sstatic.net/yedYz.png)
https://www.w3.org/TR/css-align-3/#overview

<br>

## Grid

### `flex`와의 차이점

- flex: 1차원 흐름 제어
- grid: 2차원 흐름 제어
- 1차원, 2차원?
  - 공간의 차원을 나타내는 개념
  - 1차원: 선과 같이 한 방향으로만 움직일 수 있는 공간
  - 2차원: 면과 같이 두 개의 방향(가로, 세로)으로 움직일 수 있는 공간을 의미

<br>

![Grid terminology](https://webkit.org/wp-content/uploads/grid-concepts.svg)

### `fr`단위

그리드 컨테이너에 남아있는 사용 가능한 공간을 공유하는 단위

```
grid-template-columns: 1fr 1fr 1fr;
grid-template-columns: repeat(3, 1fr);
```
