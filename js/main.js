import Game from "./modules/Game.js"

/*
	TODO
		- Pause game menu
		- Fix bug if the ball hits of the top of the player paddle
*/

function handleLoad() {
	const game = new Game()
}

window.onload = handleLoad
