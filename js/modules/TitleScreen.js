import { TITLE_SCREEN_START_GAME_KEY } from "../constants.js"

export default class TitleScreen {
	constructor(canvas, handleStartGame) {
		this.canvas = canvas
		this.handleStartGame = handleStartGame

		this.handleKeyDown = this.handleKeyDown.bind(this)

		this.init()
	}

	init() {
		this.addListeners()
		this.canvas.drawTitleScreen()
	}

	addListeners() {
		window.addEventListener("keydown", this.handleKeyDown)
	}

	removeListeners() {
		window.removeEventListener("keydown", this.handleKeyDown)
	}

	handleKeyDown({ keyCode }) {
		if (keyCode === TITLE_SCREEN_START_GAME_KEY) {
			this.handleStartGameKeyPressed()
		}
	}

	handleStartGameKeyPressed() {
		this.removeListeners()
		this.handleStartGame()
	}
}
