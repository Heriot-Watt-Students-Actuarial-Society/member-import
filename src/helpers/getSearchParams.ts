// Only search for emails from the sender, and that were received today.
const getSearchParams = (): (string | Date)[][] => {
  const emailFrom: string = process.env.EMAIL_FROM as string
  return [
    ["HEADER", "FROM", emailFrom],
    ["ON", new Date()],
  ]
}

export default getSearchParams
