import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "studentPhoto") {
      cb(null, "public/Student");
    } else if (file.fieldname === "InstructorPhoto") {
      cb(null, "public/Instructor/Photo");
    } else if (file.fieldname === "InstructorCertificate") {
      cb(null, "public/Instructor/Certificate");
    } else if (file.fieldname === "courseVideo") {
      cb(null, "public/Courses/Videos");
    } else if (file.fieldname === "coursePdfs") {
      cb(null, "public/Courses/Pdfs");
    } else {
      cb(new Error("Sorry, provided format is not supported"), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Allowed image types
  const allowedPhotoTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/heif",
    "image/webp",
    "image/heic",
  ];

  // Allowed PDF types
  const allowedPdfs = [
    "application/pdf",
    "application/xps",
    "application/fdf",
    "application/postscript",
  ];

  // Allowed video types
  const allowedVideoTypes = ["video/mp4", "video/mpeg", "video/x-flv"];

  // Photo filter
  if (
    file.fieldname === "studentPhoto" ||
    file.fieldname === "InstructorPhoto"
  ) {
    if (allowedPhotoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Photo format not supported"), false);
    }
  }

  // PDF filter
  else if (
    file.fieldname === "coursePdfs" ||
    file.fieldname === "InstructorCertificate"
  ) {
    if (allowedPdfs.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("PDF format not supported"), false);
    }
  }

  // Video filter
  else if (file.fieldname === "courseVideo") {
    if (allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Video type not supported"), false);
    }
  }

  // If no match, return error
  else {
    cb(new Error("Invalid file field"), false);
  }
};

export const Upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
