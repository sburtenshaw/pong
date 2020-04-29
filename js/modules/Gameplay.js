import Player from "./Player.js"
import Ball from "./Ball.js"

import { GAME_KEYS, WIN_SCORE } from "../constants.js"

export default class Gameplay {
	constructor(canvas, handleEndGame) {
		this.canvas = canvas
		this.handleEndGame = handleEndGame

		this.runGame = false
		this.lastFrame = null

		this.keys = GAME_KEYS.reduce((obj, key) => {
			obj[key] = false
			return obj
		}, {})
		this.winScore = WIN_SCORE

		this.roundWon = this.roundWon.bind(this)
		this.handleKeydown = this.handleKeydown.bind(this)
		this.handleKeyup = this.handleKeyup.bind(this)
		this.frame = this.frame.bind(this)

		this.players = []
		this.ball = null

		this.init()
	}

	init() {
		this.players = [new Player(this.canvas, 0), new Player(this.canvas, 1)]
		this.ball = new Ball(this.canvas, this.roundWon)
		this.addListeners()
		this.runGame = true
		this.frame()
	}

	endGame() {
		this.removeListeners()
		this.runGame = false
		this.handleEndGame()
	}

	addListeners() {
		window.addEventListener("keydown", this.handleKeydown)
		window.addEventListener("keyup", this.handleKeyup)
	}

	removeListeners() {
		window.removeEventListener("keydown", this.handleKeydown)
		window.removeEventListener("keyup", this.handleKeyup)
	}

	frame(ms) {
		if (this.runGame) {
			if (this.lastFrame) {
				const delta = (ms - this.lastFrame) / 1000
				this.update(delta)
				this.draw(delta)
			}
			this.lastFrame = ms
			requestAnimationFrame(this.frame)
		}
	}

	update(delta) {
		if (this.runGame) {
			for (const player of this.players) {
				player.update(delta, this.keys)
			}
			this.ball.update(delta, this.players)
		}
	}

	draw(delta) {
		if (this.runGame) {
			this.canvas.drawBackground()
			this.canvas.drawCenterLine()
			this.canvas.drawScores(this.players)
			for (const player of this.players) {
				player.draw()
			}
			this.ball.draw()
		}
	}

	roundWon(player) {
		player.incrementScore()
		if (player.score === this.winScore) {
			this.endGame()
		} else {
			for (const player of this.players) {
				player.resetPos()
			}
			this.ball.reset()
		}
	}

	handleKeydown({ keyCode }) {
		if (GAME_KEYS.includes(keyCode)) {
			if (keyCode === 27) {
				this.endGame()
			} else {
				this.keys[keyCode] = true
			}
		}
	}

	handleKeyup({ keyCode }) {
		if (GAME_KEYS.includes(keyCode)) {
			this.keys[keyCode] = false
		}
	}
}
