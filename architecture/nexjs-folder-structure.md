# Next.js Folder Structure <!-- omit from toc -->

- [colocation](#colocation)
- [lib vs helpers vs utils](#lib-vs-helpers-vs-utils)
- [참고](#참고)

## colocation

- 해당 라우트 화면에서 필요한 코드를 해당 폴더 내부에 모아 배치
- 함께 수정되는 파일을 같은 디엑토리에 둠
- 개발자의 유지보수 과정을 캐시의 지역성에 대입해 생각해봤을 때 유지보수가 더 용이할 수 있음

```
app/
├── (dashboard)/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── components/     # dashboard만의 컴포넌트
│   │   └── lib/           # dashboard만의 로직
│   └── analytics/
│       ├── page.tsx
│       └── components/
├── (blog)/
│   └── blog/
│       ├── page.tsx
│       ├── [slug]/
│       └── components/
├── components/             # 정말 전역적으로 사용되는 것만
│   ├── ui/                # Button, Input 등 기본 UI
│   └── layout/            # Header, Footer 등
├── lib/                   # 전역 유틸리티
└── hooks/                 # 전역 커스텀 훅
```

## lib vs helpers vs utils

- `lib`: 복잡한 설정 + 외부 연동 (도서관처럼 체계적)
- `helpers`: 프로젝트 특화 로직 (도우미처럼 업무 도움)
- `utils`: 순수 도구 함수 (도구처럼 단순 기능)

## 참고

- [Frontend Fundamentals - 3. 응집도 - A. 함께 수정되는 파일을 같은 디렉토리에 두기](https://frontend-fundamentals.com/code-quality/code/examples/code-directory.html)
