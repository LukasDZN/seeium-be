// const fetchRecordsFromTable = ({ tableName, maxRecords }: {
//     tableName: string;
//     maxRecords: number;
// }) => {
// base('Table 1').select({
//     // Selecting the first 3 records in Grid view:
//     maxRecords: 3,
//     view: "Grid view"
// }).eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.

import { base } from 'airtable'

//     records.forEach(function(record) {
//         console.log('Retrieved', record.get('Name'));
//     });

//     // To fetch the next page of records, call `fetchNextPage`.
//     // If there are more records, `page` will get called again.
//     // If there are no more records, `done` will get called.
//     fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return; }
// });

export const fetchRecordsFromTable = ({ base, tableName, maxRecords }: {
    base: unknown;
    tableName: string;
    maxRecords: number;
}) => {
  base(tableName)
    .select({
      maxRecords,
    //   view: 'Grid view',
    })
    .eachPage(
      (records, fetchNextPage) => {
        // This function will get called for each page of records.
        records.forEach((record) => {
          console.log('Retrieved', record.get('Name'))
        })

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, this function will get called again.
        // If there are no more records, `done` will be called.
        fetchNextPage()
      },
      (err) => {
        if (err) {
          console.error(err)
          return
        }
      }
    )
}
