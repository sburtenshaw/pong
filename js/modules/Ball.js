import { negateNumber, getRandomNumberWithinRange } from "../helpers.js"

import {
	CONTRAST_COLOUR,
	BALL_WIDTH,
	BALL_HEIGHT,
	BALL_BASE_X_VELOCITY,
	BALL_MAX_BASE_Y_VELOCITY,
	BALL_X_VELOCITY_INCREMENT,
} from "../constants.js"

export default class Ball {
	constructor(canvas, roundWon) {
		this.canvas = canvas
		this.roundWon = roundWon

		this.colour = CONTRAST_COLOUR
		this.width = BALL_WIDTH
		this.height = BALL_HEIGHT
		this.x = this.getStartPos("x")
		this.xDir = this.getStartDir()
		this.xVel = BALL_BASE_X_VELOCITY
		this.xVelIncrement = BALL_X_VELOCITY_INCREMENT
		this.y = this.getStartPos("y")
		this.yVel = this.getStartYVelocity()
	}

	update(delta, players) {
		if (!this.hasRoundWon(players)) {
			this.checkContact(players)
			this.xVel += this.xVelIncrement
			this.x += this.xVel * delta * this.xDir
			this.y += this.yVel * delta
		}
	}

	draw() {
		this.canvas.context.fillStyle = this.colour
		this.canvas.context.fillRect(this.x, this.y, this.width, this.height)
	}

	reset() {
		this.x = this.getStartPos("x")
		this.xDir = this.getStartDir()
		this.xVel = BALL_BASE_X_VELOCITY
		this.y = this.getStartPos("y")
		this.yVel = this.getStartYVelocity()
	}

	getStartPos(axis) {
		if (axis === "x") {
			return this.canvas.width * 0.5 - this.width * 0.5
		} else {
			return this.canvas.height * 0.5 - this.height * 0.5
		}
	}

	getStartDir() {
		return Math.random() < 0.5 ? -1 : 1
	}

	getStartYVelocity() {
		return getRandomNumberWithinRange(
			negateNumber(BALL_MAX_BASE_Y_VELOCITY),
			BALL_MAX_BASE_Y_VELOCITY
		)
	}

	hasRoundWon(players) {
		if (this.xDir === -1 && this.x <= 0) {
			this.roundWon(players[1])
			return true
		} else if (
			this.xDir === 1 &&
			this.x + this.width >= this.canvas.width
		) {
			this.roundWon(players[0])
			return true
		}
		return false
	}

	checkContact(players) {
		const playerContactMap = players.map(({ getContactMap }) =>
			getContactMap({
				width: this.width,
				height: this.height,
				x: this.x,
				y: this.y,
			})
		)

		if (
			(this.yVel < 0 && this.y <= 0) ||
			(this.yVel > 0 && this.y + this.height >= this.canvas.height)
		) {
			this.yVel = negateNumber(this.yVel)
		}

		for (const { x, y } of playerContactMap) {
			if (x.face !== 0) {
				this.handlePlayerXContact(x.position)
			} else if (y.face !== 0) {
				this.handlePlayerYContact()
			}
		}
	}

	handlePlayerXContact(position) {
		this.xDir = negateNumber(this.xDir)
		this.yVel = negateNumber(position * 200)
	}

	handlePlayerYContact() {
		this.yVel = negateNumber(this.yVel)
	}
}
