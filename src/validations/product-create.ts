import { string, object, number } from 'yup';

import { CHARCOUNT, MESSAGES } from '@/constants/product-create';

const trimString = string().trim();

export const productCreateSchema = object().shape({
  title: trimString
    .min(CHARCOUNT.TITLE_MIN, MESSAGES.TITLE_MIN)
    .max(CHARCOUNT.TITLE_MAX, MESSAGES.TITLE_MAX)
    .required(),
  description: trimString
    .min(CHARCOUNT.DESCRIPTION_MIN, MESSAGES.DESCRIPTION_MIN)
    .max(CHARCOUNT.DESCRIPTION_MAX, MESSAGES.DESCRIPTION_MAX)
    .required(),
  image: trimString.required(MESSAGES.IMAGE_REQUIRED),
  price: number()
    .integer(MESSAGES.PRICE_IS_VALID)
    .positive(MESSAGES.PRICE_IS_POSITIVE)
    .typeError(MESSAGES.PRICE_REQUIRED),
});
