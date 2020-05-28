import { MemberData, SegmentRequest } from "types"

import generateEmailArray from "./generateEmailArray"

const generateSegmentAddBatchQuery = (
  data: MemberData,
  segmentId: string,
): SegmentRequest => {
  const emailArray = generateEmailArray(data)
  const listId: string = process.env.MAILCHIMP_MEMBERS_LIST_ID as string

  return {
    method: "post",
    path: `/lists/${listId}/segments/${segmentId}`,
    body: {
      members_to_add: emailArray,
    },
  }
}

export default generateSegmentAddBatchQuery
