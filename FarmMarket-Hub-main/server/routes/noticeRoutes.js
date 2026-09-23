const express = require("express");

const router = express.Router();

const {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const validateNotice = require("../validators/noticeValidator");

router
  .route("/")
  .get(getNotices)
  .post(validateNotice, createNotice);

router
  .route("/:id")
  .get(getNoticeById)
  .put(validateNotice, updateNotice)
  .delete(deleteNotice);

module.exports = router;