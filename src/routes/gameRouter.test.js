import request from "supertest"
import app from "../app"
import lodash from "lodash"
import fs from "fs"

// Prevent database service to write tests game to filesystem
jest.mock("fs")

// Prevent shuffle for tests
jest.mock("lodash")
lodash.shuffle.mockImplementation((array) => array)

describe("Game router", () => {
  test("should create a game", async () => {
    const expectedGame = {
      id: 1,
      name: "test",
      market: ["camel", "camel", "camel", "diamonds", "diamonds"],
      _deck: [
        "silver",
        "silver",
        "silver",
        "silver",
        "silver",
        "silver",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
      ],
      _players: [
        {
          hand: ["diamonds", "diamonds", "diamonds", "diamonds", "gold"],
          camelsCount: 0,
          score: 0,
        },
        {
          hand: ["gold", "gold", "gold", "gold", "gold"],
          camelsCount: 0,
          score: 0,
        },
      ],
      currentPlayerIndex: 0,
      tokens: {
        diamonds: [7, 7, 5, 5, 5],
        gold: [6, 6, 5, 5, 5],
        silver: [5, 5, 5, 5, 5],
        cloth: [5, 3, 3, 2, 2, 1, 1],
        spice: [5, 3, 3, 2, 2, 1, 1],
        leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
      },
      _bonusTokens: {
        3: [2, 1, 2, 3, 1, 2, 3],
        4: [4, 6, 6, 4, 5, 5],
        5: [8, 10, 9, 8, 10],
      },
      isDone: false,
    }

    const response = await request(app).post("/games").send({ name: "test" })
    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual(expectedGame)
  })

  test("should take a merchandise", async () => {
    fs.readFileSync.mockImplementation(() => {
      return JSON.stringify([
        {
          id: 1,
          name: "aliquip in magna incididunt voluptate",
          market: ["camel", "camel", "camel", "silver", "camel"],
          _deck: [
            "leather",
            "gold",
            "camel",
            "leather",
            "spice",
            "diamonds",
            "gold",
            "leather",
            "leather",
            "silver",
            "cloth",
            "leather",
            "camel",
            "cloth",
            "gold",
            "camel",
            "cloth",
            "spice",
            "diamonds",
            "leather",
            "spice",
            "diamonds",
            "spice",
            "cloth",
            "leather",
            "gold",
            "camel",
            "camel",
            "gold",
            "silver",
            "diamonds",
            "camel",
            "silver",
            "spice",
            "leather",
            "spice",
            "leather",
            "cloth",
            "silver",
            "spice",
          ],
          _players: [
            {
              hand: ["silver", "diamonds", "gold", "leather", "spice", "spice"],
              camelsCount: 1,
              score: 0,
            },
            {
              hand: ["spice", "diamonds", "cloth", "cloth", "cloth"],
              camelsCount: 0,
              score: 0,
            },
          ],
          currentPlayerIndex: 0,
          tokens: {
            diamonds: [7, 7, 5, 5, 5],
            gold: [6, 6, 5, 5, 5],
            silver: [5, 5, 5, 5, 5],
            cloth: [5, 3, 3, 2, 2, 1, 1],
            spice: [5, 3, 3, 2, 2, 1, 1],
            leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
          },
          _bonusTokens: {
            3: [2, 3, 2, 3, 1, 2, 1],
            4: [6, 4, 5, 5, 6, 4],
            5: [10, 10, 8, 9, 8],
          },
          isDone: false,
        },
      ])
    })

    const response = await request(app)
      .put("/games/1/take-good")
      .send({
        good: "spice",
      })
      .set("playerIndex", "0")
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      id: 1,
      name: "aliquip in magna incididunt voluptate",
      market: ["camel", "camel", "camel", "silver", "camel"],
      _deck: [
        "leather",
        "gold",
        "camel",
        "leather",
        "spice",
        "diamonds",
        "gold",
        "leather",
        "leather",
        "silver",
        "cloth",
        "leather",
        "camel",
        "cloth",
        "gold",
        "camel",
        "cloth",
        "spice",
        "diamonds",
        "leather",
        "spice",
        "diamonds",
        "spice",
        "cloth",
        "leather",
        "gold",
        "camel",
        "camel",
        "gold",
        "silver",
        "diamonds",
        "camel",
        "silver",
        "spice",
        "leather",
        "spice",
        "leather",
        "cloth",
        "silver",
        "spice",
      ],
      _players: [
        {
          hand: [
            "silver",
            "diamonds",
            "gold",
            "leather",
            "spice",
            "spice",
            "spice",
          ],
          camelsCount: 1,
          score: 0,
        },
        {
          hand: ["spice", "diamonds", "cloth", "cloth", "cloth"],
          camelsCount: 0,
          score: 0,
        },
      ],
      currentPlayerIndex: 0,
      tokens: {
        diamonds: [7, 7, 5, 5, 5],
        gold: [6, 6, 5, 5, 5],
        silver: [5, 5, 5, 5, 5],
        cloth: [5, 3, 3, 2, 2, 1, 1],
        spice: [5, 3, 3, 2, 2, 1, 1],
        leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
      },
      _bonusTokens: {
        3: [2, 3, 2, 3, 1, 2, 1],
        4: [6, 4, 5, 5, 6, 4],
        5: [10, 10, 8, 9, 8],
      },
      isDone: false,
    })
  })
  test("should list game", async () => {
    fs.readFileSync.mockImplementation(() => {
      return JSON.stringify([
        {
          id: 1,
          name: "test",
        },
      ])
    })

    await request(app).post("/games").send({ name: "test" })
    const response2 = await request(app).get("/games")
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toStrictEqual([
      {
        id: 1,
        name: "test",
      },
    ])
  })
})
