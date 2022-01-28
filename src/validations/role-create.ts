import { string, object, number } from 'yup';

import { CHARCOUNT, MESSAGES } from '@/constants/role-create';

const trimString = string().trim();

const permissions = [1, 2, 3, 4, 5, 6, 7, 8];

export const roleCreateSchema = object().shape({
  name: trimString
    .min(CHARCOUNT.NAME_MIN, MESSAGES.NAME_MIN)
    .max(CHARCOUNT.NAME_MAX, MESSAGES.NAME_MAX)
    .required(),
  permissions: number().typeError(MESSAGES.PERMISSION_REQUIRED).oneOf(permissions),
});
