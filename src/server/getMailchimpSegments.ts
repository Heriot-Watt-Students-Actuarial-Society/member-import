import Mailchimp from "mailchimp-api-v3"
import { MailchimpSegmentIds, MailchimpSegments } from "types"

import currentAcademicYear from "../helpers/currentAcademicYear"

export const getSegmentsFromMailchimp = async (): Promise<
  MailchimpSegments
> => {
  const mailchimpApiKey: string = process.env.MAILCHIMP_API as string
  const listId: string = process.env.MAILCHIMP_MEMBERS_LIST_ID as string

  const mailchimp = new Mailchimp(mailchimpApiKey)

  const results = await mailchimp.get({
    path: `/lists/${listId}/segments`,
  })

  const { segments } = results

  return segments
}

export const getSegmentIds = async (): Promise<MailchimpSegmentIds> => {
  const segments = await getSegmentsFromMailchimp()

  const segmentIds: MailchimpSegmentIds = {}

  segments.forEach((segment) => {
    segmentIds[segment.name] = segment.id
  })

  return segmentIds
}

export const getSegmentNames = async (): Promise<string[]> => {
  const segments = await getSegmentsFromMailchimp()

  return segments.map((segment) => {
    return segment.name
  })
}

export const createNewSegment = async (segmentName: string): Promise<void> => {
  const mailchimp = new Mailchimp(process.env.MAILCHIMP_API as string)

  try {
    await mailchimp.post({
      path: `/lists/${process.env.MAILCHIMP_MEMBERS_LIST_ID}/segments`,
      body: {
        name: segmentName,
        static_segment: [],
      },
    })
  } catch (error) {
    /**
     * If the tag already exists but the execution has made it this far, there
     * is lag between sending the previous request and getting the response,
     * which can happen. In this case, just continue with the code logic.
     */
    if (error.detail === "Sorry, that tag already exists.") {
      return
    }
    if (error) throw error
  }
}

export const verifyMailchimpSegments = async (): Promise<void> => {
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
