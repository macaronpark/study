# SSH(Secure Shell) <!-- omit from toc -->

- [HTTPS vs SSH 연결 차이](#https-vs-ssh-연결-차이)
- [동작 원리](#동작-원리)
- [Github SSH 설정](#github-ssh-설정)
- [Github SSH 설정 후 git clone을 하면 발생하는 일](#github-ssh-설정-후-git-clone을-하면-발생하는-일)
  - [1단계: 보안 채널 수립](#1단계-보안-채널-수립)
  - [2단계: 사용자 인증](#2단계-사용자-인증)
  - [3단계: 데이터 전송](#3단계-데이터-전송)
- [참고](#참고)


원격 서버/서비스에 안전하게 접속하는 프로토콜

## HTTPS vs SSH 연결 차이

- **HTTP / HTTPS**
  - 카테고리: 웹 전송 프로토콜
  - 역할: 브라우저와 웹 서버가 문서, 이미지, API 데이터 등을 주고받는 규약
  - HTTPS는 HTTP에 SSL/TLS 보안 계층을 추가한 버전
- **SSH**
  - 카테고리: **원격 접속/보안 프로토콜**
  - 역할: 네트워크를 통해 원격 서버에 로그인·명령 실행·파일 전송을 안전하게 하기 위한 규약
  - GitHub에서 **인증 수단**으로 사용
    - **매번 비밀번호를 입력하는 대신, 한 번 등록한 열쇠로 신원을 증명**
    - 비대칭키 사용 - 개인키로만 공개키가 만든 암호를 풀 수 있기 때문에, 개인키를 가진 사람 = 본인이라는 걸 증명할 수 있음

<br>

## 동작 원리

자물쇠(공개키)는 서버에 걸어두고, 그걸 열 수 있는 열쇠(비밀키)는 나만 갖고 있는 구조

- 비대칭 암호화: 두 개의 키가 쌍으로 동작해 비밀번호 없이도 안전하게 인증 가능
  - **공개키 (Public Key)**
    - 자유롭게 배포 가능 (~/.ssh/id_ed25519.pub)
    - 원격 서버(GitHub 등)에 등록해둠
    - **자물쇠** 역할: 암호화하거나 서명을 검증할 때 사용
  - **비밀키 (Private Key)**
    - 내 컴퓨터에만 저장됨 (~/.ssh/id_ed25519)
    - 절대 공유하면 안 됨
    - **열쇠** 역할: 복호화하거나 서명을 생성할 때 사용
    - 네트워크로 전송되지 않음 (서명값만 전송)
  - 동작 방식
    - 서버가 challenge를 보냄
    - 비밀키로 서명 생성 → 서버로 전송
    - 서버가 공개키로 서명 검증 → "올바른 비밀키 소유자구나!" 인증 완료

<br>

## Github SSH 설정

1. Key gen: `ssh-keygen -t ed25519 -C "pxxxsxzy.0@gmail.com"`
2. Configure multiple keys if needed
    ```shell
    # 회사 계정 (예: git clone git@github.com:company/repo.git)
    Host github.com
      ...
      IdentityFile ~/.ssh/id_ed25519
      IdentitiesOnly yes

    # 개인 계정 (예: git clone git@github-personal:yourname/repo.git)
    Host github-personal # 별칭
      HostName github.com # 실제 접속할 서버 주소
      ...
      IdentityFile ~/.ssh/id_ed25519-personal
      IdentitiesOnly yes
    ``` 
3. Add key to Github: `pbcopy < ~/.ssh/id_ed25519.pub`
4. Check connected Github account: `ssh -T git@{host}`
5. Check git config
    ```shell
    # Global config for company account
    git config --global user.name "company-name"
    git config --global user.email "company-email"

    # Local config for personal account
    git config user.name "macaronpark"
    git config user.email "pxxxsxzy.0@gmail.com"
    ```

<br>

## Github SSH 설정 후 git clone을 하면 발생하는 일

**요약**
1. 암호화된 보안 채널(SSH) 수립
2. 서버 신원 확인 (처음 연결 시)
3. 공개키/비밀키로 사용자 인증
4. 인증된 채널로 Git 데이터 전송

### 1단계: 보안 채널 수립

1. TCP 연결
   - 내 컴퓨터가 GitHub 서버의 SSH 포트(22번)로 연결
   
2. SSH 프로토콜 버전 교환

3. 암호화 알고리즘 협상
   - 앞으로 사용할 암호화/압축 방식 합의
   
4. 세션 키 생성 (Diffie-Hellman Key Exchange)
   - 양쪽이 **공개 정보를 교환**
   - 각자의 비밀 정보와 조합해 **같은 세션 키를 독립적으로 계산**
   - 중간에 해커가 공개 정보를 가로채도 세션 키는 계산 불가
   - **물감 섞기 비유** (실제 수학으로는 거듭제곱 연산 사용) 
     - 공통 색(공개)과 각자의 비밀 색(비공개)을 섞어서 교환
     - 받은 색에 다시 내 비밀 색을 섞으면 양쪽 모두 같은 최종 색이 됨
     - 중간에 교환되는 색을 봐도, 비밀 색을 모르면 최종 색을 만들 수 없음
   - 세션 키의 역할:
     - 이후 모든 데이터를 대칭키 암호화 (빠름)
     - 데이터 무결성 검증
     - 세션 종료 시 폐기 (재사용 불가)

5. 서버 인증 (처음 연결 시만)
   - GitHub 서버가 자신의 호스트 키로 신원 증명
   - 클라이언트가 키 지문 확인:
      ```shell
          ED25519 key fingerprint is SHA256:+DiY3wvvV6T...
          Are you sure you want to continue? (yes/no)
      ```
   - 승인 시 `~/.ssh/known_hosts`에 저장
   - 다음부터는 자동 검증 (중간자 공격 방지)

### 2단계: 사용자 인증

암호화된 채널 안에서 진행:

1. 클라이언트의 연결 요청
   - `git clone git@github.com:username/repo.git`
   - Git이 SSH로 연결 시도
   
2. 인증 방식 협상
   - 클라이언트: "공개키 인증 쓸게, 내 공개키는 이거야"
   - GitHub: 등록된 공개키 목록 확인
   - 일치하는 키 발견 → 무작위 challenge 생성/전송
   
3. 클라이언트의 서명 생성
   - **비밀키로 challenge에 서명**
   - 비밀키 자체는 절대 전송 안 함
   - **서명값만 GitHub에 전송**
   
4. GitHub의 검증
   - 등록된 공개키로 서명 검증
   - 성공 → "비밀키 소유자 맞음!" 인증 완료
   - 실패 → 연결 거부

### 3단계: 데이터 전송

- SSH 연결 유지된 상태
- 세션 키로 암호화된 채널 통해 Git 데이터 전송
- clone 완료

<br>

## 참고

- [IBM Developer - Getting started with SSH security and configuration](https://developer.ibm.com/articles/au-sshsecurity/)
