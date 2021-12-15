var MouseState =
{
	Running: 1,
	Killed :2,
	Dead:3
}

import AnimationKeys from "../consts/AnimationKeys"
import TextureKeys from "../consts/TextureKeys"

export default class RocketMouse extends Phaser.GameObjects.Container{
  
  constructor(scene, x, y){
    super(scene, x, y)
    this.mouseState = MouseState.Running

    this.mouse = this.scene.add.sprite(0, 0, TextureKeys.RocketMouse)
			.setOrigin(0.5, 1)

		this.flames = this.scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
		
		this.createAnimations()
    this.mouse.play(AnimationKeys.RocketMouseRun)
		this.flames.play(AnimationKeys.RocketFlamesOn)

    this.enableJetpack(false)

		this.add(this.flames)
		this.add(this.mouse)
    // Phaser.GameObjects.GameObjectCreator.sprite
    // this.mouse = this.add.sprite(0,0,'rocket-mouse')
    

    this.scene.physics.add.existing(this)
    const body = this.body
    body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.7)
		body.setOffset(this.mouse.width * -0.3, -this.mouse.height + 15)

    this.cursors = this.scene.input.keyboard.createCursorKeys()
  }

  enableJetpack(enabled)
	{
		this.flames.setVisible(enabled)
	}

  kill()
	{
		if (this.mouseState !== MouseState.Running)
		{
			return
		}

		this.mouseState = MouseState.Killed

		this.mouse.play(AnimationKeys.RocketMouseDead)

		const body = this.body 
		body.setAccelerationY(0)
		body.setVelocity(1000, 0)
		this.enableJetpack(false)
	}

  preUpdate()
	{
		const body = this.body 
		// console.log("preUpdate=====")
		switch (this.mouseState)
		{
			case MouseState.Running:
			{
				if (this.cursors.space.isDown)
				{
					body.setAccelerationY(-600)
					this.enableJetpack(true)

					this.mouse.play(AnimationKeys.RocketMouseFly, true)
				}
				else
				{
					body.setAccelerationY(0)
					this.enableJetpack(false)
				}

				if (body.blocked.down)
				{
					this.mouse.play(AnimationKeys.RocketMouseRun, true)
				}
				else if (body.velocity.y > 0)
				{
					this.mouse.play(AnimationKeys.RocketMouseFall, true)
				}
				break		
			}

			case MouseState.Killed:
			{
				body.velocity.x *= 0.99
				if (body.velocity.x <= 5)
				{
					this.mouseState = MouseState.Dead
				}
				break
			}

			case MouseState.Dead:
			{
				if (this.scene.scene.isActive('RunnerGameOver'))
				{
					break
				}

				body.setVelocity(0, 0)
				this.scene.scene.run('RunnerGameOver')
				break
			}
		}
	}

  createAnimations()
	{
		this.mouse.anims.create({
			key: AnimationKeys.RocketMouseRun,
			frames: this.mouse.anims.generateFrameNames(TextureKeys.RocketMouse, { start: 1, end: 4, prefix: 'rocketmouse_run', zeroPad: 2, suffix: '.png' }),
			frameRate: 10,
			repeat: -1
		})

		this.mouse.anims.create({
			key: AnimationKeys.RocketMouseFall,
			frames: [{
				key: TextureKeys.RocketMouse,
				frame: 'rocketmouse_fall01.png'
			}]
		})

		this.mouse.anims.create({
			key: AnimationKeys.RocketMouseFly,
			frames: [{
				key: TextureKeys.RocketMouse,
				frame: 'rocketmouse_fly01.png'
			}]
		})

		this.mouse.anims.create({
			key: AnimationKeys.RocketMouseDead,
			frames: this.mouse.anims.generateFrameNames(TextureKeys.RocketMouse, { start: 1, end: 2, prefix: 'rocketmouse_dead', zeroPad: 2, suffix: '.png' }),
			frameRate: 10
		})

		this.flames.anims.create({
			key: AnimationKeys.RocketFlamesOn,
			frames: this.flames.anims.generateFrameNames(TextureKeys.RocketMouse, { start: 1, end: 2, prefix: 'flame', suffix: '.png'}),
			frameRate: 10,
			repeat: -1
		})
	}
}