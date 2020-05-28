import md5 from "md5"

const generateSubscriberHash = (email: string): string => {
  return md5(email.toLowerCase())
}

export default generateSubscriberHash
