import { MemberData } from "types"

const parseMemberData = (data: Record<string, string>[]): MemberData[] => {
  // If there is not enough data
  if (data.length <= 1) {
    throw new Error("Not enough data")
  }

  // Create new object for data
  const memberData = data

  // Extract table headers from data. If the data is empty, pull the first object
  // as it will always contain at least one row in the table
  const tableHeader = memberData.shift() as Record<string, string>

  // For each item in the table header
  Object.keys(tableHeader).forEach((key: string) => {
    const oldKey = key

    // Get what the new key needs to be: the first word of the thing
    const newKey = tableHeader[key].toString().split(" ")[0].toLowerCase()

    // For each person
    memberData.forEach((element: Record<string, string>, elIndex: number) => {
      // Add a new key and then delete the old one.
      memberData[elIndex][newKey] = element[oldKey]
      delete memberData[elIndex][oldKey]
    })
  })

  // Add occupation
  memberData.forEach((_value, index: number) => {
    memberData[index].occupation = "Student"
  })

  return memberData as MemberData[]
}

export default parseMemberData
