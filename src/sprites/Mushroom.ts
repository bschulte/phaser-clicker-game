import 'pixi'
import 'p2'
import * as Phaser from 'phaser'

export default class Mushroom extends Phaser.Sprite {
  game: Phaser.Game
  // Function from the state to be executed when the sprite is clicked
  onClick: Function

  // Time that the sprite has been alive, used to calculate how
  // quickly the player clicks the object
  timeAlive: number = 0

  constructor(
    game: Phaser.Game,
    x: number,
    y: number,
    image: string,
    onClickFunc
  ) {
    super(game, x, y, image)

    this.game = game

    this.events.onInputDown.add(this.killSprite, this)
    this.inputEnabled = true
    this.events.onInputDown.add(this.killSprite, this)

    this.onClick = onClickFunc
  }

  update() {
    this.timeAlive += this.game.time.elapsed
  }

  killSprite() {
    console.log(
      `Killing sprite: x (${this.x}), y (${this.y}), alive for: ${
      this.timeAlive
      }`
    )
    this.onClick(this.timeAlive)
    this.destroy()
  }
}
