const asyncHandler = require("express-async-handler");
const Notice = require("../models/Notice");
const apiResponse = require("../utils/apiResponse");
const MESSAGES = require("../constants/messages");

// Create Notice
const createNotice = asyncHandler(async (req, res) => {
  const { title, description, priority, expiryDate } = req.body;

  if (!title || !description || !expiryDate) {
    res.status(400);
    throw new Error("Title, Description and Expiry Date are required");
  }

  const notice = await Notice.create({
    title,
    description,
    priority,
    expiryDate,
  });

  apiResponse(
    res,
    201,
    true,
    MESSAGES.NOTICE.CREATED,
    notice
  );
});

// Get All Notices
const getNotices = asyncHandler(async (req, res) => {
  const notices = await Notice.find({
    isActive: true,
  }).sort({
    createdAt: -1,
  });

  apiResponse(
    res,
    200,
    true,
    MESSAGES.NOTICE.FETCHED,
    notices
  );
});

// Get Notice By ID
const getNoticeById = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice || !notice.isActive) {
    res.status(404);
    throw new Error(MESSAGES.NOTICE.NOT_FOUND);
  }

  apiResponse(
    res,
    200,
    true,
    MESSAGES.NOTICE.FETCHED_ONE,
    notice
  );
});

// Update Notice
const updateNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice || !notice.isActive) {
    res.status(404);
    throw new Error(MESSAGES.NOTICE.NOT_FOUND);
  }

  notice.title = req.body.title || notice.title;
  notice.description =
    req.body.description || notice.description;
  notice.priority =
    req.body.priority || notice.priority;
  notice.expiryDate =
    req.body.expiryDate || notice.expiryDate;

  const updatedNotice = await notice.save();

  apiResponse(
    res,
    200,
    true,
    MESSAGES.NOTICE.UPDATED,
    updatedNotice
  );
});

// Soft Delete
const deleteNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice || !notice.isActive) {
    res.status(404);
    throw new Error(MESSAGES.NOTICE.NOT_FOUND);
  }

  notice.isActive = false;

  await notice.save();

  apiResponse(
    res,
    200,
    true,
    MESSAGES.NOTICE.DELETED
  );
});

module.exports = {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};