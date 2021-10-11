import request from "supertest"
import app from "../app"
import lodash from "lodash"
import * as gameRouter from "gameRouter.js"

// Prevent database service to write tests game to filesystem
jest.mock("fs")
jest.mock("lodash")
lodash.shuffle.mockImplementation((x) => x)
// TODO: Mock lodash shuffle

describe("Game router", () => {
  test("should create a game", async () => {
    const response = await request(app).post("/games").send({ name: "test" })

    const game = gameRouter.gameService.createGame()
    // TODO
  })
})
