# git <!-- omit from toc -->

- [`HEAD`](#head)
- [command](#command)
  - [`git reflog`](#git-reflog)

<br>

## `HEAD`

- **현재 체크아웃된 상태**를 나타내는 포인터
- 브랜치를 가리키는 경우 `HEAD -> main`
  - HEAD: 현재 위치를 추적하는 포인터
  - main: 브랜치 이름이자 커밋을 가리키는 포인터
  - HEAD가 main을 가리키고 있으면 커밋할 때마다 브랜치가 자동으로 새 커밋으로 이동함
- 직접 커밋을 가리키는 경우 `detached HEAD`

  ```shell
  # 현재 상황
  main -> A -> B -> C # HEAD는 main을 통해 C를 가리킴

  # detached HEAD로 이동
  git checkout B
  HEAD -> B # HEAD가 직접 B를 가리킨 상태

  # 새 커밋 D를 만들면
  HEAD -> D
  main -> A -> B -> C # main은 그대로

  # 이제 main으로 돌아가면
  git checkout main
  HEAD -> main -> C
  ```

  - 브랜치가 없는 커밋(dangling commit)은 홀로 남겨짐
    - `git reflog`로 찾을 수 있긴 하지만 브랜치가 없으면 관리가 어려움

<br>

## command

### `git reflog`

- HEAD가 가리켰던 모든 위치의 히스토리를 기록
- 새로운 작업이 위에 추가 됨
  - `HEAD@{0}`이 현재, 숫자가 클수록 과거
  - 모든 HEAD 이동이 기록됨 (commit, reset, checkout 등)
- 활용 상황

  - 실수로 잘못된 reset을 했을 때

    ```shell
    # 문제 상황
    git reset --hard HEAD~3    # 앗, 너무 많이 되돌렸다!

    # 해결책
    git reflog                 # 어디로 돌아가야 할지 확인
    git reset --hard HEAD@{1}  # reset 하기 전 상태로 복구
    ```
