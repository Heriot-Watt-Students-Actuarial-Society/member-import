import Mailchimp from "mailchimp-api-v3"
import { SendData } from "types"

import currentAcademicYear from "../helpers/currentAcademicYear"
import generateMemberBatch from "../helpers/generateMemberBatch"
import generateMemberSegmentBatch from "../helpers/generateMemberSegmentBatch"
import getMailchimpSegments from "./getMailchimpSegments"

const sendData: SendData = async (data, isFass): Promise<void> => {
  const academicYear = currentAcademicYear()
  const segmentIds = await getMailchimpSegments()

  const memberBatch = generateMemberBatch(data, isFass)

  const sasSegmentBatch = generateMemberSegmentBatch(
    data,
    segmentIds[`SAS ${academicYear}`],
  )

  const batchOp = [...memberBatch, sasSegmentBatch]

  if (isFass) {
    const fassSegmentBatch = generateMemberSegmentBatch(
      data,
      segmentIds[`FASS ${academicYear}`],
    )

    batchOp.push(fassSegmentBatch)
  }

  const mailchimp = new Mailchimp(process.env.MAILCHIMP_API as string)

  mailchimp.batch(
    batchOp,
    (err: Error) => {
      if (err) throw err
    },
    {
      wait: false,
    },
  )
}

export default sendData
