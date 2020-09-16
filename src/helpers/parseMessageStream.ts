import { Attachment, ParsedMail, simpleParser } from "mailparser"
import { Stream } from "stream"
import { SendData } from "types"

import parseMemberData from "./parseMemberData"
import parseSpreadsheet from "./parseSpreadsheet"

const parseMessage = (stream: Stream, callback: SendData): void => {
  simpleParser(stream, (parseError: Error, mail: ParsedMail) => {
    if (parseError) throw parseError

    const mailSubject = mail.subject as string

    const isFass: boolean = mailSubject.search(/fass/i) > -1

    const attachment = mail.attachments as Attachment[]

    const memberDataJson = parseSpreadsheet(attachment[0].content)
    const memberData = parseMemberData(memberDataJson)

    callback(memberData, isFass)
  })
}

export default parseMessage
