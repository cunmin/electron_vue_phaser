import RocketMouse from "./game/RocketMouse";
import TextureKeys from './consts/TextureKeys'
import LaserObstacle from "./game/LaserObstacle";


export default class RunnerGame extends Phaser.Scene {
	constructor() {
		super('RunnerGame')
	}

	init() {
		this.score = 0
		this.lifeptr = 0; // life sprite handler
		
	}

	preload() {
		this.load.setPath('src/renderer/assets/infinite_runner/');
		// this.load.image('keys', 'img/p.png')
		// this.load.image('body', 'img/bg.png')
		this.load.image(TextureKeys.Background, 'house/bg_repeat_340x640.png')
		this.load.image(TextureKeys.MouseHole, 'house/object_mousehole.png')
		this.load.image(TextureKeys.Window1, 'house/object_window1.png')
		this.load.image(TextureKeys.Window2, 'house/object_window2.png')

		this.load.image(TextureKeys.Bookcase1, 'house/object_bookcase1.png')
		this.load.image(TextureKeys.Bookcase2, 'house/object_bookcase2.png')

		this.load.image(TextureKeys.LaserEnd, 'house/object_laser_end.png')
		this.load.image(TextureKeys.LaserMiddle, 'house/object_laser.png')

		this.load.image(TextureKeys.Coin, 'house/object_coin.png')
		this.load.image('life', 'house/life.png')

		this.load.atlas(TextureKeys.RocketMouse, 'characters/rocket-mouse.png', 'characters/rocket-mouse.json')

	}
	create() {
		const width = this.scale.width
		const height = this.scale.height

		console.log("width==height===", width, height)
		this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0).setScrollFactor(0)

		this.mouseHole = this.add.image(Phaser.Math.Between(900, 1500), 501, TextureKeys.MouseHole)

		this.window1 = this.add.image(Phaser.Math.Between(900, 1300), 200, TextureKeys.Window1)
		this.window2 = this.add.image(Phaser.Math.Between(1600, 2000), 200, TextureKeys.Window2)

		this.windows = [this.window1, this.window2]

		this.bookcase1 = this.add.image(Phaser.Math.Between(2200, 2700), 580, TextureKeys.Bookcase1)
			.setOrigin(0.5, 1)

		this.bookcase2 = this.add.image(Phaser.Math.Between(2900, 3400), 580, TextureKeys.Bookcase2)
			.setOrigin(0.5, 1)

		this.bookcases = [this.bookcase1, this.bookcase2]

		this.laserObstacle = new LaserObstacle(this, 900, 100)
		this.add.existing(this.laserObstacle)

		this.coins = this.physics.add.staticGroup()
		this.spawnCoins()

		// 		Adds an existing Game Object to this Scene.

		// If the Game Object renders, it will be added to the Display List. If it has a preUpdate method, it will be added to the Update List.

		this.mouse = new RocketMouse(this, width * 0.5, height - 30)
		this.add.existing(this.mouse)

		const body = this.mouse.body

		body.setCollideWorldBounds(true)
		body.setVelocityX(200)

		this.scoreLabel = this.add.text(10, 10, `Score: ${this.score}`, {
			fontSize: '24px',
			color: '#080808',
			backgroundColor: '#F8E71C',
			shadow: { fill: true, blur: 0, offsetY: 0 },
			padding: { left: 15, right: 15, top: 10, bottom: 10 }
		})
			.setScrollFactor(0)

		this.life1 = this.add.sprite(this.scale.width - 50, 15, 'life').setScrollFactor(0);
		this.life2 = this.add.sprite(this.scale.width - 90, 15, 'life').setScrollFactor(0);
		this.life3 = this.add.sprite(this.scale.width - 130, 15, 'life').setScrollFactor(0);
		this.lifeGroup = this.add.group();
		this.lifeGroup.add(this.life1);
		this.lifeGroup.add(this.life2);
		this.lifeGroup.add(this.life3);



		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55)

		this.cameras.main.startFollow(this.mouse)
		this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

		this.physics.add.overlap(this.laserObstacle, this.mouse, this.handleOverlapLaser, undefined, this)
		this.physics.add.overlap(this.coins, this.mouse, this.handleCollectCoin, undefined, this)
	}

	handleCollectCoin(obj1, obj2) {
		
		const coin = obj2
		this.coins.killAndHide(coin)
		coin.body.enable = false

		++this.score
		this.scoreLabel.text = `Score: ${this.score}`
		global.score = this.score
	}

	handleOverlapLaser(obj1, obj2) {
		// const laser = obj1 as LaserObstacle
		//此处检测到碰撞，执行多次
		// if(this.flag){
		// 	this.flag = false
			const laser = obj1
			laser.body.enable = false
			var life = this.lifeGroup.getFirstAlive(true)
			if (life) {
				this.lifeptr++;
				console.log(this.lifeptr);
				// life.setActive(false).setVisible(false)
				this.lifeGroup.killAndHide(life)

			}

		// mouse.kill()
		// }
		
	}

	spawnCoins() {
		this.coins.children.each(child => {
			const coin = child
			this.coins.killAndHide(coin)
			coin.body.enable = false
		})

		const scrollX = this.cameras.main.scrollX
		const rightEdge = scrollX + this.scale.width

		let x = rightEdge + 100

		const numCoins = Phaser.Math.Between(1, 20)

		for (let i = 0;i < numCoins;++i) {
			const coin = this.coins.get(x, Phaser.Math.Between(100, this.scale.height - 100), TextureKeys.Coin)
			coin.setVisible(true)
			coin.setActive(true)

			const body = coin.body
			body.setCircle(body.width * 0.5)
			body.enable = true

			body.updateFromGameObject()

			x += coin.width * 1.5
		}
	}

	update() {
		this.background.setTilePosition(this.cameras.main.scrollX)

		const scrollX = this.cameras.main.scrollX
		// console.log("scrollX==",scrollX)

		this.wrapMouseHole()
		this.wrapWindows()
		this.wrapBookcases()
		this.wrapLaserObtacle()

		this.teleportBackwards()
		// game over if 3 life used
		if (this.lifeptr == 3) {
			this.mouse.kill()
		}



	}

	teleportBackwards() {
		const scrollX = this.cameras.main.scrollX
		const maxX = 2380

		if (scrollX > maxX) {
			this.mouse.x -= maxX
			this.mouseHole.x -= maxX

			this.windows.forEach(win => {
				win.x -= maxX
			})

			this.bookcases.forEach(bc => {
				bc.x -= maxX
			})

			this.laserObstacle.x -= maxX
			const laserBody = this.laserObstacle.body
			laserBody.x -= maxX

			this.spawnCoins()

			this.coins.children.each(child => {
				const coin = child
				if (!coin.active) {
					return
				}

				coin.x -= maxX
				const body = coin.body
				body.updateFromGameObject()
			})
		}
	}

	wrapLaserObtacle() {
		const scrollX = this.cameras.main.scrollX
		const rightEdge = scrollX + this.scale.width

		const body = this.laserObstacle.body
		

		const width = body.width
		if (this.laserObstacle.x + width < scrollX) {
			this.laserObstacle.x = Phaser.Math.Between(rightEdge + width, rightEdge + width + 1000)
			this.laserObstacle.y = Phaser.Math.Between(0, 300)

			body.position.x = this.laserObstacle.x + body.offset.x
			body.position.y = this.laserObstacle.y

			body.enable = true
		}
	}

	wrapBookcases() {
		const scrollX = this.cameras.main.scrollX
		const rightEdge = scrollX + this.scale.width

		let width = this.bookcase1.width * 2
		if (this.bookcase1.x + width < scrollX) {
			this.bookcase1.x = Phaser.Math.Between(rightEdge + width, rightEdge + width + 800)
			const overlap = this.windows.find(win => {
				return Math.abs(this.bookcase1.x - win.x) <= win.width
			})

			this.bookcase1.visible = !overlap
		}

		width = this.bookcase2.width
		if (this.bookcase2.x + width < scrollX) {
			this.bookcase2.x = Phaser.Math.Between(this.bookcase1.x + width, this.bookcase1.x + width + 800)
			const overlap = this.windows.find(win => {
				return Math.abs(this.bookcase2.x - win.x) <= win.width
			})

			this.bookcase2.visible = !overlap

			// this.spawnCoins()
		}
	}

	wrapWindows() {
		const scrollX = this.cameras.main.scrollX
		const rightEdge = scrollX + this.scale.width

		let width = this.window1.width * 2
		if (this.window1.x + width < scrollX) {
			this.window1.x = Phaser.Math.Between(rightEdge + width, rightEdge + width + 800)
			const overlap = this.bookcases.find(bc => {
				return Math.abs(this.window1.x - bc.x) <= this.window1.width
			})

			this.window1.visible = !overlap
		}

		width = this.window2.width
		if (this.window2.x + width < scrollX) {
			this.window2.x = Phaser.Math.Between(this.window1.x + width, this.window1.x + width + 800)
			const overlap = this.bookcases.find(bc => {
				return Math.abs(this.window2.x - bc.x) <= this.window2.width
			})

			this.window2.visible = !overlap
		}
	}

	wrapMouseHole() {
		const scrollX = this.cameras.main.scrollX
		const rightEdge = scrollX + this.scale.width

		if (this.mouseHole.x + this.mouseHole.width < scrollX) {
			this.mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000)
		}
	}

}