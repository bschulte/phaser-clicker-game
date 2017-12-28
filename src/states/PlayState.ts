import 'pixi'
import 'p2'
import * as Phaser from 'phaser'
import * as rn from 'random-number'

import Mushroom from '../sprites/Mushroom'

export default class PlayState extends Phaser.State {
  game: Phaser.Game
  mushrooms: Phaser.Group

  // Values for how often to spawn the object to be clicked
  spawnTimer: number = 0
  timeBetweenSpawns: number = 1000
  shouldSpawn: boolean = true

  // How many objects have been clicked and how many should end the level
  numObjectsClicked: number = 0
  maxNumObjectsClicked: number = 3

  // Score
  score: number = 0

  constructor() {
    super()
  }

  preload() {
    this.game.load.image('logo', './assets/images/mushroom2.png')
  }

  create() {
    this.mushrooms = this.game.add.group()
  }

  update() {
    this.spawnTimer += this.game.time.elapsed
    if (this.spawnTimer > this.timeBetweenSpawns && this.shouldSpawn) {
      this.spawnTimer = 0
      this.spawnMushroom()
    }
  }

  // Spawn a new mushroom
  spawnMushroom() {
    const newMushroom = new Mushroom(
      this.game,
      rn({ min: 10, max: this.camera.width - 80 }),
      rn({ min: 10, max: this.camera.height - 80 }),
      'logo',
      this.objWasClicked.bind(this)
    )

    this.mushrooms.add(newMushroom)
  }

  objWasClicked(timeAlive: number) {
    // Add the time that the object was alive to the score (lower is better)
    this.score += timeAlive

    this.numObjectsClicked += 1
    console.log('Num of objects clicked now:', this.numObjectsClicked)

    if (this.numObjectsClicked >= this.maxNumObjectsClicked) {
      this.shouldSpawn = false
      console.log('Finished level!')
      this.finalizeScore()
    }
  }

  finalizeScore() {
    // Add in the lifespan of any objects still on the screen
    if (this.mushrooms.length > 0) {
      console.log(
        `Adding in the lifespans of the additional (${
        this.mushrooms.length
        }) objects`
      )
      this.mushrooms.forEachAlive(function(mushroom: Mushroom) {
        this.score += mushroom.timeAlive
      }, this)
    }
    console.log('Score:', this.score)
    const scoreText = this.game.add.text(0, 0, `Score: ${this.score}`, {
      font: 'bold 32px Arial',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    })
  }
}
