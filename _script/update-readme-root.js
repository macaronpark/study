const fs = require("fs");
const path = require("path");

// 프로젝트 루트 디렉토리 설정 (이 스크립트 파일은 /update-readme-toc.js 에 위치한다고 가정)
const ROOT_DIR = path.resolve(__dirname, "..");
const README_PATH = path.join(ROOT_DIR, "README.md");

// 무시할 폴더 및 파일 목록
const IGNORE_LIST = ["node_modules", ".git", ".github", "_script"];

/**
 * 마크다운 파일에서 첫 번째 H1 태그 내용을 추출합니다.
 * @param {string} filePath - 파일 경로
 * @returns {string} H1 태그 내용 또는 파일 이름
 */
function getH1Title(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    // '# '으로 시작하는 첫 줄을 찾습니다.
    const match = content.match(/^#\s+(.*)/m);
    return match ? match[1].trim() : path.basename(filePath, ".md");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return path.basename(filePath, ".md");
  }
}

/**
 * 지정된 디렉토리를 재귀적으로 탐색하여 목차 항목을 생성합니다.
 * @param {string} dirPath - 탐색할 디렉토리 경로
 * @param {string} relativePathPrefix - 링크 생성을 위한 상대 경로 접두사
 * @returns {string[]} 마크다운 형식의 목차 라인 배열
 */
function generateTocForDir(dirPath, relativePathPrefix = "") {
  let tocLines = [];
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // 디렉토리를 먼저, 그 다음 파일을, 모두 알파벳 순으로 정렬
    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "README.md") continue;

      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(relativePathPrefix, entry.name).replace(/\\/g, "/");

      if (entry.isDirectory()) {
        const subTocLines = generateTocForDir(fullPath, relativePath);
        if (subTocLines.length > 0) {
          // ! 예외 - main 함수에서 별도 처리
          if (entry.name === "programmers") continue;

          // 서브 폴더의 파일들을 들여쓰기하여 추가
          tocLines.push(`- ${entry.name}`);
          tocLines = tocLines.concat(subTocLines.map((line) => `  ${line}`));
        }
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const title = getH1Title(fullPath);
        tocLines.push(`- [${title}](${relativePath})`);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
  return tocLines;
}

/**
 * 메인 함수: README.md 파일을 업데이트합니다.
 */
function main() {
  const topLevelDirs = fs
    .readdirSync(ROOT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !IGNORE_LIST.includes(dirent.name))
    .map((dirent) => dirent.name)
    .sort();

  let toc = ["## 목차"];

  for (const dirName of topLevelDirs) {
    toc.push(`\n### ${dirName}`);

    // ! _log 폴더는 README.md만 보여준다
    if (dirName === "_log") {
      toc.push(`- 주간 공부 계획과 실제 학습 현황 기록\n  - [_log/README.md](/_log/README.md)`);
      continue;
    }
    // ! algorithm/programmers 폴더는 README.md만 보여준다
    if (dirName === "algorithm") {
      toc.push(
        `- 문제 풀이 기록\n  - [algorithm/programmers/README.md](/algorithm/programmers/README.md)`
      );
    }

    const dirPath = path.join(ROOT_DIR, dirName);
    const dirToc = generateTocForDir(dirPath, dirName);
    toc = toc.concat(dirToc);
  }

  const tocContent = toc.join("\n");
  const readmeContent = fs.readFileSync(README_PATH, "utf-8");
  const tocStartMarker = "<!-- TOC_START -->";
  const tocEndMarker = "<!-- TOC_END -->";

  const newReadmeContent = readmeContent.replace(
    new RegExp(`${tocStartMarker}[\\s\\S]*${tocEndMarker}`),
    `${tocStartMarker}\n${tocContent}\n${tocEndMarker}`
  );

  fs.writeFileSync(README_PATH, newReadmeContent, "utf-8");
  console.log("✅ /README.md 목차 업데이트 성공");
}

main();
