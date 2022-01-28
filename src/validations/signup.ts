import { string, object } from 'yup';

import { CHARCOUNT, MESSAGES } from '@/constants/signup';

const trimString = string().trim();

export const signupSchema = object().shape({
  firstname: trimString
    .min(CHARCOUNT.FIRSTNAME_MIN, MESSAGES.FIRSTNAME_MIN)
    .max(CHARCOUNT.FIRSTNAME_MAX, MESSAGES.FIRSTNAME_MAX)
    .required(),
  lastname: trimString
    .min(CHARCOUNT.LASTNAME_MIN, MESSAGES.LASTNAME_MIN)
    .max(CHARCOUNT.LASTNAME_MAX, MESSAGES.LASTNAME_MAX)
    .required(),
  email: trimString.email(MESSAGES.EMAIL_IS_VALID).required(MESSAGES.EMAIL_REQUIRED),
  password: trimString
    .min(CHARCOUNT.PASSWORD_MIN, MESSAGES.PASSWORD_MIN)
    .max(CHARCOUNT.PASSWORD_MAX, MESSAGES.PASSWORD_MAX)
    .required(),
  password_confirm: trimString
    .min(CHARCOUNT.PASSWORD_CONFIRM_MIN, MESSAGES.PASSWORD_CONFIRM_MIN)
    .max(CHARCOUNT.PASSWORD_CONFIRM_MAX, MESSAGES.PASSWORD_CONFIRM_MAX)
    .required(),
});
