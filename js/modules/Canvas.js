import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	CANVAS_ID,
	CANVAS_BACKGROUND,
	CANVAS_LINE_NUM,
	CANVAS_LINE_MARGIN,
	CANVAS_LINE_WIDTH,
	CONTRAST_COLOUR,
	SCORE_FONT,
} from "../constants.js"

export default class Canvas {
	constructor() {
		this.width = CANVAS_WIDTH
		this.height = CANVAS_HEIGHT
		this.docId = CANVAS_ID

		this.backgroundColour = CANVAS_BACKGROUND

		this.lineColour = CONTRAST_COLOUR
		this.lineCount = CANVAS_LINE_NUM
		this.lineMargin = CANVAS_LINE_MARGIN
		this.lineWidth = CANVAS_LINE_WIDTH

		this.textColour = CONTRAST_COLOUR
		this.scoreFont = SCORE_FONT

		this.context = null
	}

	create() {
		this.context = document.getElementById(this.docId).getContext("2d")
	}

	drawBackground() {
		this.context.fillStyle = this.backgroundColour
		this.context.fillRect(0, 0, this.width, this.height)
	}

	drawCenterLine() {
		this.context.fillStyle = this.lineColour
		let i = 0
		while (i < this.lineCount) {
			this.context.fillRect(
				this.width * 0.5 - this.lineWidth * 0.5,
				(this.height / this.lineCount + this.lineMargin) * i +
					this.lineMargin,
				this.lineWidth,
				this.height / this.lineCount - this.lineMargin
			)
			i++
		}
	}

	drawScores(players) {
		this.context.fillStyle = this.textColour
		this.context.font = this.scoreFont
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
}
