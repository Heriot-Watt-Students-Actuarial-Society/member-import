import md5 from "md5"

/**
 * Generate the subscriber hash as outlined by MailChimp
 * https://mailchimp.com/developer/api/marketing/list-members/get-member-info/
 */
const generateSubscriberHash = (email: string): string => {
  return md5(email.toLowerCase())
}

export default generateSubscriberHash
