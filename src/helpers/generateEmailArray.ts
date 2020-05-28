import { MemberData } from "types"

const generateEmailArray = (data: MemberData): string[] => {
  return data.map((person) => {
    return person.email
  })
}

export default generateEmailArray
