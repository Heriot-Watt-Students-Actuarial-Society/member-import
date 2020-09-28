import generateSubscriberHash from "../generateSubscriberHash"

const baseEmail = "joebloggs123@hw.ac.uk"

describe("each subscriber hash", () => {
  test("is 32 characters long", () => {
    const hash = generateSubscriberHash(baseEmail)
    expect(hash).toHaveLength(32)
  })

  test("are all lowercase", () => {
    const hash = generateSubscriberHash(baseEmail)
    expect(hash.toLowerCase()).toStrictEqual(hash)
  })

  test("is only hexadecimal", () => {
    const hash = generateSubscriberHash(baseEmail)
    expect(hash).toMatch(/^[0-9a-fA-F]{32}$/)
  })
})

it("correctly hashed the example", () => {
  const expected = "aeabb605b149ce94b336fef6a0955659"
  const actual = generateSubscriberHash(baseEmail)

  expect(actual).toStrictEqual(expected)
})
