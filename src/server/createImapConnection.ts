import Imap from "imap"

const createImapConnection = (): Imap => {
  const imapServer = new Imap({
    user: process.env.EMAIL_USER as string,
    password: process.env.EMAIL_PASS as string,
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT as string, 10),
    tls: true,
  })

  imapServer.once("error", (imapError: Error) => {
    throw imapError
  })

  return imapServer
}

export default createImapConnection
