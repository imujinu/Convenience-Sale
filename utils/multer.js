const multer = require("multer");
const path = require("path");

// (1) 디스크 저장 방식 설정
const storage = multer.diskStorage({
  // 업로드 폴더 지정
  destination: (req, file, cb) => {
    // 실제 폴더: C:\Users\Administrator\Desktop\Convenience-Sale\static\uploads\board
    cb(null, "static/uploads/board");
  },
  // 업로드 파일명 설정
  filename: (req, file, cb) => {
    // 확장자
    const ext = path.extname(file.originalname);
    // 파일명 (확장자 제외)
    const basename = path.basename(file.originalname, ext);
    // 최종 파일명: [현재시각_원본명].확장자
    cb(null, Date.now() + "_" + basename + ext);
  },
});

// (2) 파일 필터 (이미지 여부 확인)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // 통과
  } else {
    cb(new Error("이미지 파일만 업로드 가능합니다."), false);
  }
};

// (3) 최대 파일 사이즈(5MB 예시)
const limits = { fileSize: 100 * 1024 * 1024 };

// (4) multer 미들웨어 생성
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = upload;
