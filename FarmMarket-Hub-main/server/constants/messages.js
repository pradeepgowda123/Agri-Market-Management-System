const MESSAGES = {
  COMMON: {
    SERVER_ERROR: "Something went wrong",
    NOT_FOUND: "Resource not found",
    VALIDATION_ERROR: "Validation failed",
  },

  VEGETABLE: {
    CREATED: "Vegetable created successfully",
    UPDATED: "Vegetable updated successfully",
    DELETED: "Vegetable deleted successfully",
    FETCHED: "Vegetables fetched successfully",
    FETCHED_ONE: "Vegetable fetched successfully",
    ALREADY_EXISTS: "Vegetable already exists",
    NOT_FOUND: "Vegetable not found",
    RESTORED: "Vegetable restored successfully",
  },

  MARKET: {
    CREATED: "Market created successfully",
    UPDATED: "Market updated successfully",
    DELETED: "Market deleted successfully",
    FETCHED: "Markets fetched successfully",
    FETCHED_ONE: "Market fetched successfully",
    ALREADY_EXISTS: "Market already exists",
    NOT_FOUND: "Market not found",
    RESTORED: "Market restored successfully"
  },

  NOTICE: {
  CREATED: "Notice created successfully",
  UPDATED: "Notice updated successfully",
  DELETED: "Notice deleted successfully",
  FETCHED: "Notices fetched successfully",
  FETCHED_ONE: "Notice fetched successfully",
  NOT_FOUND: "Notice not found",
},

  AUTH: {
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    INVALID_CREDENTIALS: "Invalid email or password",
    UNAUTHORIZED: "Unauthorized access",
    TOKEN_REQUIRED: "Token is required",
  },

  DAILY_PRICE: {
  CREATED: "Daily price created successfully",
  UPDATED: "Daily price updated successfully",
  DELETED: "Daily price deleted successfully",
  FETCHED: "Daily prices fetched successfully",
  FETCHED_ONE: "Daily price fetched successfully",
  ALREADY_EXISTS: "Daily price already exists for this market, vegetable and date",
  NOT_FOUND: "Daily price not found",
  RESTORED: "Daily price restored successfully",
},
};

module.exports = MESSAGES;