import TextureKeys from '../consts/TextureKeys'

export default class LaserObstacle extends Phaser.GameObjects.Container
{
	constructor(scene, x, y)
	{
		super(scene, x, y)

		const top = this.scene.add.image(0, 0, TextureKeys.LaserEnd)
			.setOrigin(0.5, 0)

		const middle = this.scene.add.image(0, top.y + top.displayHeight, TextureKeys.LaserMiddle)
			.setOrigin(0.5, 0)

		middle.setDisplaySize(middle.width, 200)

		const bottom = this.scene.add.image(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd)
			.setOrigin(0.5, 0)
			.setFlipY(true)

		this.add(top)
		this.add(middle)
		this.add(bottom)

		this.scene.physics.add.existing(this, true)

		const body = this.body 
		const width = top.displayWidth
		const height = top.displayHeight + middle.displayHeight + bottom.displayHeight
		body.setSize(width, height)
		body.setOffset(-width * 0.5, 0)

		// reposition body
		body.position.x = this.x + body.offset.x
		body.position.y = this.y
	}
}
