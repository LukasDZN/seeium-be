import { PlaceSchema } from './places.schema.js'

// GeoSpatial index

PlaceSchema.index({
  point: '2dsphere',
})

// Fuzzy search index

// Note: You can create an Atlas Search index using the Atlas UI , Atlas Search API , or Atlas CLI.

// This is JSON format index to be used in Atlas UI

// {
//   "placesSearch": {
//     "dynamic": false,
//     "fields": {
//       "name.en.full": [
//         {
//           "analyzer": "lucene.standard",
//           "foldDiacritics": true,
//           "maxGrams": 7,
//           "minGrams": 3,
//           "tokenization": "edgeGram",
//           "type": "autocomplete"
//         }
//       ],
//     }
//   }
// }
