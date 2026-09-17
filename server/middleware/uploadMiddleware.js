const multer = require("multer");
const path = require("path");

// =====================================
// Storage
// =====================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// =====================================
// File Filter
// =====================================

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        // Images
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",

        // Audio
        "audio/mpeg",
        "audio/wav",
        "audio/x-wav",
        "audio/webm",
        "audio/ogg",
        "audio/mp4",
        "audio/x-m4a"
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    }

    else {

        cb(new Error("Only image files are allowed."), false);

    }

};

// =====================================
// Upload
// =====================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

module.exports = upload;