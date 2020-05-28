import { MemberData } from "types"
import XLSX from "xlsx"

const parseSpreadsheet = (buffer: Buffer): MemberData => {
  const SHEET_NUMBER = 0
  const workbook = XLSX.read(buffer, { type: "buffer" })
  const sheetNameList = workbook.SheetNames
  const worksheet = workbook.Sheets[sheetNameList[SHEET_NUMBER]]
  const worksheetJson = XLSX.utils.sheet_to_json(worksheet) as Record<
    string,
    string
  >[]
  return worksheetJson
}

export default parseSpreadsheet
