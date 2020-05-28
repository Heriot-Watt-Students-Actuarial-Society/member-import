import { FetchOptions } from "imap"

const getFetchParams = (): FetchOptions => {
  return {
    bodies: "",
    struct: true,
    markSeen: true,
  }
}

export default getFetchParams
