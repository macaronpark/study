const fs = require("fs");
const path = require("path");

// --- Constants ---
const ROOT_DIR = path.resolve(__dirname, "..");
const LOG_DIR = path.join(ROOT_DIR, "_log");
const README_PATH = path.join(LOG_DIR, "README.md");
const TOC_START_MARKER = "<!-- TOC_START -->";
const TOC_END_MARKER = "<!-- TOC_END -->";
const DEFAULT_README_CONTENT = `# study > \_log\n\n주간 공부 계획과 실제 학습 현황을 기록합니다.\n\n${TOC_START_MARKER}\n${TOC_END_MARKER}`;

// --- Execution ---
run();

// --- Functions ---

/**
 * 메인 실행 함수
 */
function run() {
  try {
    const weeklyFiles = getWeeklyLogFiles(LOG_DIR);
    const tocContent = generateTocContent(weeklyFiles);
    const currentReadmeContent = readReadmeContent(README_PATH);
    const newReadmeContent = updateReadme(currentReadmeContent, tocContent);

    fs.writeFileSync(README_PATH, newReadmeContent, "utf-8");

    console.log("✅ _log/README.md 목차 업데이트 성공");
  } catch (error) {
    console.error("❌ _log/README.md 업데이트 중 오류 발생:", error);
    process.exit(1); // 에러 발생 시 스크립트 종료
  }
}

/**
 * _log 디렉토리에서 주간 로그 파일 목록을 최신순으로 정렬하여 가져옵니다.
 * @param {string} logDir - 스캔할 로그 디렉토리 경로.
 * @returns {string[]} 주간 로그 파일 이름의 배열.
 */
function getWeeklyLogFiles(logDir) {
  const files = fs.readdirSync(logDir, { withFileTypes: true });
  const weeklyFiles = files
    .filter((dirent) => dirent.isFile() && /^\d{2}-\d{2}-W\d{2}\.md$/.test(dirent.name))
    .map((dirent) => dirent.name);

  return weeklyFiles.sort().reverse();
}

/**
 * 주간 로그 파일 목록을 기반으로 마크다운 목차(TOC) 문자열을 생성합니다.
 * @param {string[]} weeklyFiles - 주간 로그 파일 이름 배열.
 * @returns {string} 마크다운 링크가 포함된 목차 문자열.
 */
function generateTocContent(weeklyFiles) {
  const tocLinks = weeklyFiles.map((fileName) => {
    const linkPath = `/_log/${fileName}`;
    return `[${fileName}](${linkPath})`;
  });

  return tocLinks.join(" | ");
}

/**
 * README.md 파일 내용을 읽어옵니다. 파일이 없으면 기본 템플릿을 반환합니다.
 * @param {string} readmePath - README 파일의 전체 경로.
 * @returns {string} README 파일의 내용.
 */
function readReadmeContent(readmePath) {
  try {
    return fs.readFileSync(readmePath, "utf-8");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`README.md 파일을 찾을 수 없어 새로 생성합니다: ${readmePath}`);
      return DEFAULT_README_CONTENT;
    }
    // 그 외 다른 에러는 다시 던져서 main의 catch 블록에서 처리
    throw error;
  }
}

/**
 * README 내용에서 TOC 섹션을 찾아 새로운 내용으로 교체합니다.
 * @param {string} content - 원본 README 내용.
 * @param {string} toc - 삽입할 새로운 목차 내용.
 * @returns {string} TOC가 업데이트된 새로운 README 내용.
 */
function updateReadme(content, toc) {
  const tocRegex = new RegExp(`${TOC_START_MARKER}[\\s\\S]*${TOC_END_MARKER}`);
  const newTocBlock = `${TOC_START_MARKER}\n\n${toc}\n\n${TOC_END_MARKER}`;

  return content.replace(tocRegex, newTocBlock);
}
