import { MemberData, MemberRequest } from "types"

import currentAcademicYear from "./currentAcademicYear"
import generateSubscriberHash from "./generateSubscriberHash"

const generateMemberBatch = (
  data: MemberData,
  isFass: boolean,
): MemberRequest[] => {
  const academicYear = currentAcademicYear()

  const listId = process.env.MAILCHIMP_MEMBERS_LIST_ID as string

  const tags = isFass
    ? [`SAS ${academicYear}`, `FASS ${academicYear}`]
    : [`SAS ${academicYear}`]

  return data.map((person) => {
    const subscriberHash = generateSubscriberHash(person.email)

    return {
      method: "put",
      path: `/lists/${listId}/members/${subscriberHash}`,
      body: {
        email_address: person.email,
        status: "subscribed",
        status_if_new: "subscribed",
        merge_fields: {
          FNAME: person.first,
          LNAME: person.last,
          OCCUPATION: person.occupation,
          MATRIC: person.card,
        },
        tags,
      },
    }
  })
}

export default generateMemberBatch
