export const CHARCOUNT = {
  TITLE_MIN: 2,
  TITLE_MAX: 100,
  DESCRIPTION_MIN: 2,
  DESCRIPTION_MAX: 300,
};

export const MESSAGES = {
  TITLE_MIN: `first name must be at least ${CHARCOUNT.TITLE_MIN} characters`,
  TITLE_MAX: `first name must be shorter than ${CHARCOUNT.TITLE_MAX} characters`,
  DESCRIPTION_MIN: `last name must be at least ${CHARCOUNT.DESCRIPTION_MIN} characters`,
  DESCRIPTION_MAX: `last name must be shorter than ${CHARCOUNT.DESCRIPTION_MAX} characters`,
  PRICE_IS_VALID: 'price must be a number',
  PRICE_IS_POSITIVE: 'price must be a positive number',
  PRICE_REQUIRED: 'price is a required field',
  IMAGE_REQUIRED: 'image is a required field',
};
