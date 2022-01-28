export const CHARCOUNT = {
  NAME_MIN: 2,
  NAME_MAX: 6,
};

export const MESSAGES = {
  NAME_MIN: `name must be at least ${CHARCOUNT.NAME_MIN} characters`,
  NAME_MAX: `name must be shorter than ${CHARCOUNT.NAME_MAX} characters`,
  PERMISSION_REQUIRED: `permission is a required field`,
};
