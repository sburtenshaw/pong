import Canvas from "./Canvas.js"
import TitleScreen from "./TitleScreen.js"
import Gameplay from "./Gameplay.js"

export default class Game {
	constructor() {
		this.handleStartGame = this.handleStartGame.bind(this)
		this.handleEndGame = this.handleEndGame.bind(this)

		this.canvas = null
		this.titleScreen = null
		this.gameplay = null

		this.init()
	}

	init() {
		this.canvas = new Canvas()
		this.canvas.create()
		this.titleScreen = new TitleScreen(this.canvas, this.handleStartGame)
	}

	handleStartGame() {
		this.titleScreen = null
		this.gameplay = new Gameplay(this.canvas, this.handleEndGame)
	}

	handleEndGame() {
		this.gameplay = null
		this.titleScreen = new TitleScreen(this.canvas, this.handleStartGame)
	}
}
