const fs = require("fs");
const path = require("path");

// 스크립트의 위치를 기준으로 경로 설정
const ROOT_DIR = path.resolve(__dirname, "..");
const LOG_DIR = path.join(ROOT_DIR, "_log");
const README_PATH = path.join(LOG_DIR, "README.md");

/**
 * 메인 함수: _log/README.md 파일을 업데이트합니다.
 */
function main() {
  let tocLines = [];

  try {
    // _log 디렉토리 내의 주간 폴더들을 읽어옵니다.
    const weeklyDirs = fs
      .readdirSync(LOG_DIR, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory() && /^\d{4}-W\d{2}$/.test(dirent.name))
      .map((dirent) => dirent.name)
      .sort()
      .reverse(); // 최신 주차가 위로 오도록 역순 정렬

    for (const dirName of weeklyDirs) {
      tocLines.push(`- [${dirName}](./${dirName}/README.md)`);
    }

    // _log/README.md 파일 읽기
    let readmeContent;
    try {
      readmeContent = fs.readFileSync(README_PATH, "utf-8");
    } catch (error) {
      // 파일이 없으면 기본 템플릿 생성
      readmeContent = `# study > \_log\n\n주간 공부 계획과 실제 학습 현황을 기록합니다.\n\n<!-- TOC_START -->\n<!-- TOC_END -->`;
    }

    const tocContent = tocLines.join("\n");
    const tocStartMarker = "<!-- TOC_START -->";
    const tocEndMarker = "<!-- TOC_END -->";

    // 기존 TOC 내용을 새로운 내용으로 교체
    const newReadmeContent = readmeContent.replace(
      new RegExp(`${tocStartMarker}[\\s\\S]*${tocEndMarker}`),
      `${tocStartMarker}\n${tocContent}\n${tocEndMarker}`
    );

    // 파일에 쓰기
    fs.writeFileSync(README_PATH, newReadmeContent, "utf-8");
    console.log("✅ _log/README.md 목차 업데이트 성공");
  } catch (error) {
    console.error("Error updating _log/README.md:", error);
  }
}

main();
