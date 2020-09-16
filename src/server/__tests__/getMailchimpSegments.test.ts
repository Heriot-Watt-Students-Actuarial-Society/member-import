import { MailchimpSegmentIds, MailchimpSegments } from "types"

import {
  getSegmentIds,
  getSegmentNames,
  getSegmentsFromMailchimp,
} from "../getMailchimpSegments"

describe("getSegmentsFromMailchimp", () => {
  let segments: MailchimpSegments

  beforeAll(async () => {
    segments = await getSegmentsFromMailchimp()
  })

  test("to not be undefined", () => {
    expect(segments).toBeDefined()
  })

  test("to each have an id", () => {
    segments.forEach((segment) => {
      expect(segment).toHaveProperty("id")
      expect(segment.id).toEqual(expect.any(Number))
    })
  })

  test("to each have a name", () => {
    segments.forEach((segment) => {
      expect(segment).toHaveProperty("name")
      expect(segment.name).toEqual(expect.any(String))
    })
  })
})

describe("getSegmentIds", () => {
  let segmentsIds: MailchimpSegmentIds

  beforeAll(async () => {
    segmentsIds = await getSegmentIds()
  })

  test("has each key is a string", () => {
    const keys = Object.keys(segmentsIds)
    keys.forEach((key) => {
      expect(key).toEqual(expect.any(String))
    })
  })

  test("has each value as a number", () => {
    const values = Object.values(segmentsIds)
    values.forEach((value) => {
      expect(value).toEqual(expect.any(Number))
    })
  })
})

test("gets all segment names", async () => {
  const names = await getSegmentNames()

  names.forEach((name) => expect(name).toEqual(expect.any(String)))
})
