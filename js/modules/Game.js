import Canvas from "./Canvas.js"
import Player from "./Player.js"
import Ball from "./Ball.js"

import { GAME_KEYS, WIN_SCORE } from "../constants.js"

export default class Game {
	constructor() {
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

		this.canvas = new Canvas()
		this.players = [new Player(this.canvas, 0), new Player(this.canvas, 1)]
		this.ball = new Ball(this.canvas, this.roundWon)

		this.init()
	}

	init() {
		this.addListeners()
		this.canvas.create()
		this.frame()
	}

	addListeners() {
		window.addEventListener("keydown", this.handleKeydown)
		window.addEventListener("keyup", this.handleKeyup)
	}

	frame(ms) {
		if (this.lastFrame) {
			this.update((ms - this.lastFrame) / 1000)
			this.draw()
		}
		this.lastFrame = ms
		requestAnimationFrame(this.frame)
	}

	update(delta) {
		if (!this.hasGameWon()) {
			for (const player of this.players) {
				player.update(delta, this.keys)
			}
			this.ball.update(delta, this.players)
		}
	}

	draw() {
		this.canvas.drawBackground()
		this.canvas.drawCenterLine()
		this.canvas.drawScores(this.players)
		for (const player of this.players) {
			player.draw()
		}
		this.ball.draw()
	}

	reset() {
		for (const player of this.players) {
			player.reset()
		}
		this.ball.reset()
	}

	hasGameWon() {
		for (const player of this.players) {
			if (player.score === this.winScore) {
				this.reset()
				return true
			}
		}
		return false
	}

	roundWon(player) {
		player.incrementScore()
		for (const player of this.players) {
			player.resetPos()
		}
		this.ball.reset()
	}

	handleKeydown({ keyCode }) {
		if (GAME_KEYS.includes(keyCode)) {
			this.keys[keyCode] = true
		}
	}

	handleKeyup({ keyCode }) {
		if (GAME_KEYS.includes(keyCode)) {
			this.keys[keyCode] = false
		}
	}
}
