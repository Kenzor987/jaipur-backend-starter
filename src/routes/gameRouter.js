import express from "express"
import * as gameService from "../services/gameService"
import * as databaseService from "../services/databaseService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  if (!req.body.name) {
    return res.status(400).send("Missing name parameter")
  }
  const newGame = gameService.createGame(req.body.name)
  res.status(201).json(newGame)
})

// Listen to GET /games
router.get("/", function (req, res) {
  res.json(databaseService.getGames())
})

// PUT
router.put("/:id/take-good/", function (req, res) {
  const gameId = parseInt(req.params.id)
  const playerId = parseInt(req.header("playerIndex"))
  if ((playerId === 0 || playerId === 1) && gameId === 0) {
    return res.status(400).send("Missing path and/or header parameters")
  } else {
    const game = databaseService.getGames()[gameId]
    if (playerId === game.currentPlayerIndex) {
      const playerHand = game._players[playerId].hand
      if (playerHand.length < 7) {
        playerHand.forEach((element) => console.log(element))
        playerHand.push(req.body.good)
        playerHand.forEach((element) => console.log(element))
      }
      return res.status(200).send()
    }
  }
})
// TO DO les exceptions si le joueur a plus de 7 cartes et si ce n'est pas au playerId de jouer
export default router
