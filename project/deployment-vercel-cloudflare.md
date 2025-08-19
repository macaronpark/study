# vercel 배포 with cloudflare 도메인

next.js 프로젝트를 vercel로 배포하면서 배운 개념들

## next.js로 빌드

## vercel로 배포

- vercel이란?
  - 프론트엔드 개발자가 서버 신경 안 쓰고 코드만 작성해도 자동으로 빌드, 배포, 전송 최적화까지 해주는 플랫폼
  - next.js를 만든 회사에서 만든 서비스라 next.js와 잘 맞도록 설계됨
- 특징
  - 간단한 배포: 저장소 연결 -> 푸시하면 자동으로 빌드, 배포됨
  - preview 배포: PR을 올리면 임시 URL로 배포되어 머지 전 실제 배포 환경처럼 테스트 가능
  - production 배포: main에 머지되면 자동으로 실서비스 배포됨
  - 서버리스 함수 지원: 서버없이 API 라우트 구현 가능
  - 전 세계 CDN: 기본적으로 글로벌 엣지 네트워크에서 정적 리소스 빠르게 서비스

## DNS

- DNS(Domain Name System)
  - 인터넷의 분산 데이터베이스
  - 사람이 기억하기 좋은 문자열 주소(`suzypark.dev`)를 컴퓨터가 이해할 수 있는 IP 주소(`0.0.0.0`)로 바꿔줌
- DNS Record
  - DNS 데이터베이스에 저장된 항목
  - DNS 서버가 클라이언트 요청에 어떻게 대답할지를 정의하는 룰북
  - 종류
    - `A`: IPv4 주소 (suzypark.dev → 123.45.67.89)
    - `AAAA`: IPv6 주소
    - `CNAME`: 별칭 (www.suzypark.dev → suzypark.dev)
- Cloudflare
  - 도메인 등록 + DNS 관리 + 보안/캐시 제공
  - DNS records를 관리하는 UI/서비스 제공
    - (1) Cloudflare에서 CNAME www → vercel-dns-xxxx.com 같은 레코드를 만들기
    - (2) 전 세계 DNS 서버가 이 정보를 받아 캐싱함
    - (3) 크롬이 물어봤을 때 IP를 알려줌

## redirect와 subdomain

- www.suzypark.dev → suzypark.dev 리다이렉트 설정 (301 Permanent Redirect 권장)
- 서브도메인: blog.suzypark.dev, api.suzypark.dev 같은 것
