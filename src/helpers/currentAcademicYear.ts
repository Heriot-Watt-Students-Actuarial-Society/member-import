export const getAcademicYearFromDate = (date: Date): string => {
  // Get the data in short form; e.g. 2019 => 19
  const shortYear: number = parseInt(date.getFullYear().toString().slice(2), 10)

  /**
   * Get academic year based on the month.
   * Note: when month == 8, it is currently September.
   */
  return date.getMonth() >= 8
    ? `${shortYear}/${shortYear + 1}`
    : `${shortYear - 1}/${shortYear}`
}

const currentAcademicYear = (): string => {
  // Get current date
  const date = new Date()

  return getAcademicYearFromDate(date)
}

export default currentAcademicYear
