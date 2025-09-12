# 인증 관리 <!-- omit from toc -->

- [주요 인증 방식](#주요-인증-방식)
- [OAuth](#oauth)
- [용어](#용어)
- [사전 등록](#사전-등록)
- [인가 승인(Authorization Grant)](#인가-승인authorization-grant)
  - [Authorization Code Grant](#authorization-code-grant)
- [참고](#참고)

<br>

## 주요 인증 방식

- 세션 기반 인증 (서버 세션 ID + 쿠키)
- 토큰 기반 인증 (JWT, stateless)
- OAuth 2.0 / OpenID Connect(OIDC)

<br>

## OAuth

사용자가 가입된 서비스의 API에 접근하려면 사용자로부터 권한을 위임받아야 한다.
이때 사용자의 아이디와 비밀번호 없이도 권한을 위임받을 수 있어야 한다.
이를 위해 고안된 기술이 OAuth다.

<br>

## 용어

- Resource Owner
  - 보호된 리소스에 대한 접근 권한을 부여할 수 있는 주체
  - 예: 사용자, end-user
- Client
  - 리소스 소유자를 대신해서 보호된 리소스를 요청하는 앱
  - 예: TARP Client, MyServer, 써드파티 앱
- Authorization Server
  - 리소스 소유자를 인증하고 권한을 얻은 후 액세스 토큰을 발급하는 서버
  - 예: 구글/깃허브/애플 인증처리 전담 서버
- Resource Server
  - 보호된 리소스를 호스팅 하는 서버
  - 액세스 토큰을 사용해 보호된 리소스 요청을 수락하고 응답
  - 예: 구글/깃허브/애플 데이터를 가지고 있는 서버

<br>

## 사전 등록

- OAuth를 이용해서 Resource Server에 접속하기 위해서는 우선 Resource Server에 등록해야 함
  - 클라이언트 식별을 위한 **Client ID와 Client Secret**을 발급받음
  - Authorization Code 발급에 사용할 **Authorized redirect URI**를 설정함

## 인가 승인(Authorization Grant)

- **"사용자가 허락했다"**라는 **증명**임
- 클라이언트가 실제 데이터에 접근할 수 있는 **액세스 토큰**을 얻기 위해 사용
- 승인 타입
  - Authorization Code: 가장 안전한 방식 (웹앱에서 주로 사용)
  - Implicit: 단순하지만 덜 안전 (이제 거의 안 씀)
  - Resource Owner: 아이디/비밀번호 직접 입력 (신뢰할 수 있는 앱에서만)
  - Client Credentials: 앱 자체의 인증 (사용자 없이 앱끼리 통신)

### Authorization Code Grant

https://datatracker.ietf.org/doc/html/rfc6749#section-4.1

```
     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)

   Note: The lines illustrating steps (A), (B), and (C) are broken into
   two parts as they pass through the user-agent.

                     Figure 3: Authorization Code Flow
```

<br>

## 참고

- [The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)
- [opentutorials.org - WEB2 OAuth 2.0](https://opentutorials.org/module/3668/22004)
