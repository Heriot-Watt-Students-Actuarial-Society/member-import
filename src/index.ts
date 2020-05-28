// import * as dotenv from "dotenv"

import getData from "./server/getData"
import sendData from "./server/sendData"

// const config = dotenv.config()

// if (config.error) {
//   throw config.error
// }

getData(sendData)
