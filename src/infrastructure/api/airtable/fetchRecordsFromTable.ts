import axios from 'axios'
import { airtableConstants } from './airtable.constants.js'
import { AirtablePlaceRecordResponseDto } from './airtableResponse.dto.js'
import { validateAirtableResponseDto } from './airtableResponse.dto.validator.js'
import { mapAirtableResponseToPlaceEntities } from './mapAirtableResponseDtoToPlaceEntities.js'
import { envVariables } from '../../../config/envVariables.js'

const MAX_RECORDS = 100 // Max allowed by Airtable API

export const fetchRecordsFromTable = async ({
  tableIdOrName,
  viewId,
  maxRecords = MAX_RECORDS,
}: {
  tableIdOrName: string
  viewId?: string
  maxRecords?: number
}) => {
  if (maxRecords > 100 || maxRecords < 1) {
    throw new Error('maxRecords must be between 1 and 100')
  }

  let recordCount = 1
  let pageCount = 1
  let allRecords: AirtablePlaceRecordResponseDto[] = []

  const url = `https://api.airtable.com/v0/${airtableConstants.BASE}/${tableIdOrName}`
  const params = {
    view: viewId,
    maxRecords,
  }
  const headers = {
    Authorization: `Bearer ${envVariables.AIRTABLE_API_KEY}`,
  }

  let response = await axios.get(url, { params, headers })

  while (response.data.records.length > 0) {
    for (const record of response.data.records) {
      console.log('\n Record:')
      console.log(JSON.stringify(record, null, 2))

      const validAirtableResponse = validateAirtableResponseDto({
        airtableResponseDto: record,
      })

      console.log(`  📝 Record count: ${recordCount} retrieved`)
      recordCount++

      allRecords.push(validAirtableResponse)
    }

    console.log(`📝 Page count: ${pageCount} retrieved.`)
    pageCount++

    if (response.data.offset) {
      response = await axios.get(url, {
        params: { ...params, offset: response.data.offset },
        headers,
      })
    } else {
      break
    }
  }

  if (!allRecords.length) {
    throw new Error('No records retrieved')
  }

  const placeEntities = mapAirtableResponseToPlaceEntities({
    airtablePlaceRecordResponse: allRecords,
  })

  return placeEntities
}
