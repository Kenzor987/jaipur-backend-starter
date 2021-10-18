import * as gameService from "./gameService"

// TODO: Mock lodash shuffle

describe("Game service", () => {
  test("should put camels from hand to herd", () => {
    // TODO
    const game = {
      _players: [
        { hand: ["camel", "camel", "camel"], camelsCount: 0 },
        { hand: ["gold", "gold", "diamond"], camelsCount: 1 },
        { hand: ["camel", "diamond"], camelsCount: 0 },
      ],
    }
    gameService.putCamelsFromHandToHerd(game)
    expect(game._players[0].hand.length).toEqual(0)
    expect(game._players[0].camelsCount).toEqual(3)
    expect(game._players[0].hand).toStrictEqual([])

    expect(game._players[1].hand.length).toEqual(3)
    expect(game._players[1].camelsCount).toEqual(1)
    expect(game._players[1].hand).toStrictEqual(["gold", "gold", "diamond"])

    expect(game._players[2].hand.length).toEqual(1)
    expect(game._players[2].camelsCount).toEqual(1)
    expect(game._players[2].hand).toStrictEqual(["diamond"])
  })

  test("should init a deck", () => {
    // TODO
    const deck = gameService.initDeck()

    expect(deck.filter((x) => x === "diamonds").length).toBe(6)
    expect(deck.filter((x) => x === "gold").length).toEqual(6)
    expect(deck.filter((x) => x === "silver").length).toEqual(6)
    expect(deck.filter((x) => x === "cloth").length).toEqual(8)
    expect(deck.filter((x) => x === "spice").length).toEqual(8)
    expect(deck.filter((x) => x === "leather").length).toEqual(10)
    expect(deck.filter((x) => x === "camel").length).toEqual(8)
  })

  test("should draw cards", () => {
    // TODO
    const deck = ["camel", "diamond", "cloth"]
    const drawedCard = gameService.drawCards(deck, 1)

    expect(drawedCard).toStrictEqual(["camel"])
    expect(deck.length).toEqual(2)
  })
})
// test commit10
