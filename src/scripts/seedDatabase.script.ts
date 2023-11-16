// import { envVariables } from '../config/envVariables.js'
// import { connectToDb } from '../config/mongodb.js'
// import { HotelMappingModel } from '../modules/v1/hotelMappings/data/hotelMappings.model.js'
// import { hotelMappingWriteRecord } from '../modules/v1/hotelMappings/data/hotelMappings.seed.js'
// import HotelModel from '../modules/v1/hotels/data/hotel.model.js'
// import { hotelWriteRecord } from '../modules/v1/hotels/data/hotel.seed.js'

// const seedDatabase = async () => {
//   if (envVariables.APP_ENV === 'production') {
//     throw new Error(`You cannot seed the production database!`)
//   }

//   await connectToDb()

//   await HotelModel.deleteMany({})

//   await HotelModel.create(hotelWriteRecord)
// }

// console.log(`🚀 Starting ${seedDatabase.name} script...`)

// await seedDatabase()

// console.log(
//   `✅ ${seedDatabase.name} script completed! '${envVariables.APP_ENV}' database seeded!`
// )

// process.exit(0)
