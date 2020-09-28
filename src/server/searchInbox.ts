import Imap from "imap"
import { SendData } from "types"

import getSearchParams from "../helpers/getSearchParams"
import parseMessageStream from "../helpers/parseMessageStream"

const searchInbox = (imapServer: Imap, sendDataCallback: SendData): void => {
  imapServer.search(getSearchParams(), (searchError, results) => {
    if (searchError) throw searchError

    if (results.length <= 0) {
      imapServer.end()
      return
    }

    const fetchParams = {
      bodies: "",
      struct: true,
      markSeen: true,
    }

    const fetchedServer = imapServer.fetch(results, fetchParams)

    fetchedServer.on("message", (message) => {
      message.on("body", (stream) =>
        parseMessageStream(stream, sendDataCallback),
      )
    })

    fetchedServer.once("error", (fetchError) => {
      throw fetchError
    })

    fetchedServer.once("end", () => {
      imapServer.end()
    })
  })
}

export default searchInbox
