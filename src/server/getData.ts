import Imap from "imap"
import { SendData } from "types"

import createImapConnection from "./createImapConnection"
import searchInbox from "./searchInbox"

const openInbox = (imapServer: Imap, callback: SendData): void => {
  const inboxName = process.env.INBOX_NAME as string

  imapServer.openBox(inboxName, true, (error: Error) => {
    if (error) throw error

    searchInbox(imapServer, callback)
  })
}

const getData = (callback: SendData): void => {
  const imapServer = createImapConnection()

  imapServer.once("ready", () => {
    openInbox(imapServer, callback)
  })

  imapServer.connect()
}

export default getData
