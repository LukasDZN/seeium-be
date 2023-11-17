import { z } from 'zod'
import { AirtableResponseDtoSchema } from './airtableResponse.dto.validator.js'

export type AirtablePlaceRecordResponseDto = z.infer<
  typeof AirtableResponseDtoSchema
>
