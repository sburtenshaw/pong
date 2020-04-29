import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	CANVAS_ID,
	CANVAS_BACKGROUND,
	CANVAS_LINE_NUM,
	CANVAS_LINE_MARGIN,
	CANVAS_LINE_WIDTH,
	CONTRAST_COLOUR,
	TITLE_SCREEN_TITLE_FONT,
	TITLE_SCREEN_START_MESSAGE_FONT,
	SCORE_FONT,
	FPS_FONT,
} from "../constants.js"

export default class Canvas {
	constructor() {
		this.width = CANVAS_WIDTH
		this.height = CANVAS_HEIGHT
		this.docId = CANVAS_ID

		this.backgroundColour = CANVAS_BACKGROUND

		this.context = null
	}

	create() {
		this.context = document.getElementById(this.docId).getContext("2d")
	}

	drawTitleScreen() {
		this.context.fillStyle = this.backgroundColour
		this.context.fillRect(0, 0, this.width, this.height)
		this.context.fillStyle = CONTRAST_COLOUR
		this.context.textAlign = "center"
		this.context.font = TITLE_SCREEN_TITLE_FONT
		this.context.fillText("PONG", this.width * 0.5, 50)
		this.context.font = TITLE_SCREEN_START_MESSAGE_FONT
		this.context.fillText(
			"Press ENTER to start",
			this.width * 0.5,
			this.height * 0.5
		)
	}

	drawBackground() {
		this.context.fillStyle = this.backgroundColour
		this.context.fillRect(0, 0, this.width, this.height)
	}

	drawCenterLine() {
		this.context.fillStyle = CONTRAST_COLOUR
		let i = 0
		while (i < CANVAS_LINE_NUM) {
			this.context.fillRect(
				this.width * 0.5 - CANVAS_LINE_WIDTH * 0.5,
				(this.height / CANVAS_LINE_NUM + CANVAS_LINE_MARGIN) * i +
					CANVAS_LINE_MARGIN,
				CANVAS_LINE_WIDTH,
				this.height / CANVAS_LINE_NUM - CANVAS_LINE_MARGIN
			)
			i++
		}
	}

	drawScores(players) {
		this.context.fillStyle = CONTRAST_COLOUR
		this.context.font = SCORE_FONT
		this.context.textAlign = "center"
		for (const { id, score } of players) {
			if (id === 0) {
				this.context.fillText(score, this.width * 0.5 - 40, 40)
			}
			if (id === 1) {
				this.context.fillText(score, this.width * 0.5 + 40, 40)
			}
		}
	}

	drawFps(fps) {
		this.context.fillStyle = CONTRAST_COLOUR
		this.context.font = FPS_FONT
		this.context.textAlign = "left"
		this.context.fillText(fps, 10, 30)
	}
}
