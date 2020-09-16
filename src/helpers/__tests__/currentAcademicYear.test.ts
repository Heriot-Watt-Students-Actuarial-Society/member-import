import currentAcademicYear, {
  getAcademicYearFromDate,
} from "../currentAcademicYear"

describe("current academic year", () => {
  test("is '19/20' in July 2020", () => {
    const date = new Date(2020, 6)
    const academicYear = getAcademicYearFromDate(date)
    expect(academicYear).toBe("19/20")
  })

  test("is '19/20' in August 2020", () => {
    const date = new Date(2020, 7)
    const academicYear = getAcademicYearFromDate(date)
    expect(academicYear).toBe("19/20")
  })

  test("is '20/21' in September 2020", () => {
    const date = new Date(2020, 8)
    const academicYear = getAcademicYearFromDate(date)
    expect(academicYear).toBe("20/21")
  })

  test("is '20/21' in January 2021", () => {
    const date = new Date(2021, 1)
    const academicYear = getAcademicYearFromDate(date)
    expect(academicYear).toBe("20/21")
  })

  test("is correct for today's date", () => {
    const date = new Date()

    expect(currentAcademicYear()).toBe(getAcademicYearFromDate(date))
  })
})
