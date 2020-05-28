export interface Config {
  EMAIL_FROM: string
  EMAIL_USER: string
  EMAIL_PASS: string
  EMAIL_HOST: string
  EMAIL_PORT: number
  MAILCHIMP_API: string
  MAILCHIMP_MEMBERS_LIST_ID: string
}

export type MemberData = Record<string, string>[]

export type MailchimpSegments = Record<string, string>[]
export type MailchimpSegmentIds = Record<string, string>

export type SendData = (data: MemberData, isFass: boolean) => void

export type RequestMethod = "get" | "put" | "patch" | "delete" | "post"
export type MemberStatus =
  | "subscribed"
  | "unsubscribed"
  | "cleaned"
  | "pending"
  | "transactional"

export interface MemberRequest {
  method: RequestMethod
  path: string
  body: {
    email_address: string
    status: MemberStatus
    status_if_new?: MemberStatus
    merge_fields?: {
      FNAME?: string
      LNAME?: string
      OCCUPATION?: string
      MATRIC?: string
      COMPANY?: string
    }
    tags?: string[]
  }
}

export interface SegmentRequest {
  method: RequestMethod
  path: string
  body: {
    members_to_add: string[]
  }
}
