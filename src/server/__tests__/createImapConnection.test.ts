import { Config } from "imap"

import createImapConnection, { getImapConfig } from "../createImapConnection"

describe("getImapConfig", () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test("will receive environment variables", () => {
    process.env.EMAIL_USER = "username"
    process.env.EMAIL_PASS = "password"
    process.env.EMAIL_HOST = "host"
    process.env.EMAIL_PORT = "123"

    const expectedResult: Config = {
      user: "username",
      password: "password",
      host: "host",
      port: 123,
      tls: true,
    }

    const config = getImapConfig()
    expect(config).toStrictEqual(expectedResult)
  })
})

describe("createImapConnection", () => {
  test("creates a connection", () => {
    const connection = createImapConnection()

    connection.once("ready", () => {
      expect(connection.state).toBe("authenticated")
      connection.destroy()
    })

    connection.connect()
  })
})
