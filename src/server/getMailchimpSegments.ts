import Mailchimp from "mailchimp-api-v3"
import { MailchimpSegmentIds, MailchimpSegments } from "types"

import currentAcademicYear from "../helpers/currentAcademicYear"

const getSegmentsFromMailchimp = async (): Promise<MailchimpSegments> => {
  const mailchimpApiKey: string = process.env.MAILCHIMP_API as string
  const listId: string = process.env.MAILCHIMP_MEMBERS_LIST_ID as string

  const mailchimp = new Mailchimp(mailchimpApiKey)

  const results = await mailchimp.get({
    path: `/lists/${listId}/segments`,
  })

  const { segments } = results

  return segments
}

const getSegmentIds = async (): Promise<MailchimpSegmentIds> => {
  const segments = await getSegmentsFromMailchimp()

  const segmentIds: MailchimpSegmentIds = {}

  segments.forEach((segment) => {
    segmentIds[segment.name] = segment.id
  })

  return segmentIds
}

const getSegmentNames = async (): Promise<string[]> => {
  const segments = await getSegmentsFromMailchimp()

  return segments.map((segment) => {
    return segment.name
  })
}

const createNewSegment = async (segmentName: string): Promise<void> => {
  const mailchimp = new Mailchimp(process.env.MAILCHIMP_API as string)

  try {
    await mailchimp.post({
      path: `/lists/${process.env.MAILCHIMP_MEMBERS_LIST_ID}/segments`,
      body: {
        name: segmentName,
      },
    })
  } catch (error) {
    if (error) throw error
  }
}

const verifyMailchimpSegments = async (): Promise<void> => {
  const academicYear = currentAcademicYear()

  const segmentNames = await getSegmentNames()

  if (!segmentNames.includes(`SAS ${academicYear}`)) {
    await createNewSegment(`SAS ${academicYear}`)
  }

  if (!segmentNames.includes(`FASS ${academicYear}`)) {
    await createNewSegment(`FASS ${academicYear}`)
  }
}

const getMailchimpSegments = async (): Promise<MailchimpSegmentIds> => {
  await verifyMailchimpSegments()

  const segmentIds = await getSegmentIds()

  return segmentIds
}

export default getMailchimpSegments
