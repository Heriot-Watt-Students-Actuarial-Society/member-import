import XLSX from "xlsx"

const parseSpreadsheet = (buffer: Buffer): Record<string, string>[] => {
  const SHEET_NUMBER = 0
  const workbook = XLSX.read(buffer, { type: "buffer" })
  const sheetNameList = workbook.SheetNames
  const worksheet = workbook.Sheets[sheetNameList[SHEET_NUMBER]]
  const worksheetJson = XLSX.utils.sheet_to_json(worksheet)
  return worksheetJson as Record<string, string>[]
}

export default parseSpreadsheet
