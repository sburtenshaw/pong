import {
	CONTRAST_COLOUR,
	GAME_KEYS,
	PLAYER_WIDTH,
	PLAYER_HEIGHT,
	PLAYER_MARGIN,
	PLAYER_VELOCITY,
	PLAYER_CONTACT_BUFFER,
} from "../constants.js"

export default class Player {
	constructor(canvas, id, initScore) {
		this.canvas = canvas
		this.id = id

		this.colour = CONTRAST_COLOUR
		this.width = PLAYER_WIDTH
		this.height = PLAYER_HEIGHT
		this.margin = PLAYER_MARGIN
		this.x = this.getXPos()
		this.y = this.getYPos()
		this.yVel = PLAYER_VELOCITY

		this.score = initScore || 0

		this.getContactMap = this.getContactMap.bind(this)
	}

	update(delta, keys) {
		const dir = this.getDirection(keys)
		if (this.canMove(dir)) {
			this.y += this.yVel * delta * dir
		}
	}

	draw() {
		this.canvas.context.fillStyle = this.colour
		this.canvas.context.fillRect(this.x, this.y, this.width, this.height)
	}

	reset() {
		this.resetPos()
		this.score = 0
	}

	resetPos() {
		this.x = this.getXPos()
		this.y = this.getYPos()
	}

	incrementScore() {
		this.score++
	}

	getXPos() {
		if (this.id === 0) {
			return this.margin
		} else if (this.id === 1) {
			return this.canvas.width - this.width - this.margin
		}
	}

	getYPos() {
		return this.canvas.height * 0.5 - this.height * 0.5
	}

	getDirection(keys) {
		if (
			(this.id === 0 && keys[GAME_KEYS[0]] && !keys[GAME_KEYS[1]]) ||
			(this.id === 1 && keys[GAME_KEYS[2]] && !keys[GAME_KEYS[3]])
		) {
			return -1
		}
		if (
			(this.id === 0 && !keys[GAME_KEYS[0]] && keys[GAME_KEYS[1]]) ||
			(this.id === 1 && !keys[GAME_KEYS[2]] && keys[GAME_KEYS[3]])
		) {
			return 1
		}
		return 0
	}

	canMove(dir) {
		return (
			(dir === -1 && this.y > 0) ||
			(dir === 1 && this.y + this.height < this.canvas.height)
		)
	}

	getContactMap(ball) {
		// Return a map of edges the ball is currently touching
		return {
			id: this.id,
			x: this.getContactX(ball),
			y: this.getContactY(ball),
		}
	}

	getContactX(ball) {
		if (ball.y + ball.height >= this.y && ball.y <= this.y + this.height) {
			// ball is overlapping with player on y axis
			if (
				ball.x <= this.x + this.width &&
				ball.x >= this.x + this.width - PLAYER_CONTACT_BUFFER
			) {
				// ball is overlapping with player on x axis
				// ball is touching player on the right face
				return {
					face: 1,
					position: this.getContactPos(ball, "y"),
				}
			}
			if (
				ball.x + ball.width >= this.x &&
				ball.x + ball.width <= this.x + PLAYER_CONTACT_BUFFER
			) {
				// ball is overlapping with player on x axis
				// ball is touching player on the left face
				return {
					face: -1,
					position: this.getContactPos(ball, "y"),
				}
			}
		}
		// return default object if not touching
		return {
			face: 0,
			position: null,
		}
	}

	getContactY(ball) {
		if (ball.x + ball.width >= this.x && ball.x <= this.x + this.width) {
			// ball is overlapping with player on x axis
			if (
				ball.y <= this.y + this.height &&
				ball.y >= this.y + this.height - PLAYER_CONTACT_BUFFER
			) {
				// ball is overlapping with player on y axis
				// ball is touching player on the bottom face
				return {
					face: 1,
					position: this.getContactPos(ball, "x"),
				}
			}
			if (
				ball.y + ball.height >= this.y &&
				ball.y + ball.height <= this.y + PLAYER_CONTACT_BUFFER
			) {
				// ball is overlapping with player on y axis
				// ball is touching player on the top face
				return {
					face: -1,
					position: this.getContactPos(ball, "x"),
				}
			}
		}
		// return default object if not touching
		return {
			face: 0,
			position: null,
		}
	}

	getContactPos(ball, axis) {
		const playerPos = axis === "x" ? this.x : this.y
		const playerVariable = axis === "x" ? this.width : this.height
		const ballPos = axis === "x" ? ball.x : ball.y
		const ballVariable = axis === "x" ? ball.width : ball.height
		const middlePlayerPos = playerPos + playerVariable * 0.5
		const middleBallPos = ballPos + ballVariable * 0.5
		// return the ball position in comparison to the player on a -1 to 1 scale
		return Math.max(
			Math.min(
				(middlePlayerPos - middleBallPos) *
					(playerVariable * 0.5) *
					0.001,
				1
			),
			-1
		)
	}
}
