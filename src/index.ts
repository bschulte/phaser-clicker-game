/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi'
import 'p2'
import * as Phaser from 'phaser'
import Config from './config'

import PlayState from './states/PlayState'

class Clicker extends Phaser.Game {
    game: Phaser.Game

    constructor() {
        super(Config.width, Config.height, Phaser.AUTO, 'content')

        console.log('Starting play state!')
        this.state.add('Play', PlayState, false)
        this.state.start('Play')
    }
}

window.onload = () => {
    const game = new Clicker()
}
