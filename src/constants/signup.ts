export const CHARCOUNT = {
  FIRSTNAME_MIN: 2,
  FIRSTNAME_MAX: 50,
  LASTNAME_MIN: 2,
  LASTNAME_MAX: 50,
  PASSWORD_MIN: 6,
  PASSWORD_MAX: 100,
  PASSWORD_CONFIRM_MIN: 6,
  PASSWORD_CONFIRM_MAX: 100,
};

export const MESSAGES = {
  FIRSTNAME_MIN: `first name must be at least ${CHARCOUNT.FIRSTNAME_MIN} characters`,
  FIRSTNAME_MAX: `first name must be shorter than ${CHARCOUNT.FIRSTNAME_MAX} characters`,
  LASTNAME_MIN: `last name must be at least ${CHARCOUNT.LASTNAME_MIN} characters`,
  LASTNAME_MAX: `last name must be shorter than ${CHARCOUNT.LASTNAME_MAX} characters`,
  EMAIL_REQUIRED: 'email is a required field',
  EMAIL_IS_VALID: 'email must be a valid email',
  PASSWORD_MIN: `password must be at least ${CHARCOUNT.PASSWORD_MIN} characters`,
  PASSWORD_MAX: `password must be shorter than ${CHARCOUNT.PASSWORD_MAX} characters`,
  PASSWORD_CONFIRM_MIN: `password confirm must be at least ${CHARCOUNT.PASSWORD_CONFIRM_MIN} characters`,
  PASSWORD_CONFIRM_MAX: `password confirm must be shorter than ${CHARCOUNT.PASSWORD_CONFIRM_MAX} characters`,
};
