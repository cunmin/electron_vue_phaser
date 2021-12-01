export default class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.music = this.sound.play('music', { loop: true });
        
        this.sound.play('laugh');

        var background = this.add.image(400, 300, 'background').setScale(2);
        background.setAlpha(0,1,1,1);

        const area = new Phaser.Geom.Rectangle(64, 64, 672, 472);

        this.addGerm(area, 'germ1');
        this.addGerm(area, 'germ2');
        this.addGerm(area, 'germ3');
        this.addGerm(area, 'germ4');

        this.add.shader('goo', 400, 300, 800, 600);

        this.add.image(400, 260, 'assets', 'logo');

        var starttext = this.add.bitmapText(400, 500, 'slime', 'Click to Play', 40).setOrigin(0.5);
        starttext.setInteractive();
        starttext.on('pointerdown', () => {

            this.scene.start('MainGame');

        });

        

        var backbutton = this.add.image(70, 530, 'back').setInteractive();
        backbutton.setScale(0.5);
        backbutton.on('pointerdown', () => {
            console.log("backbtn")
            this.scene.start('WrapinCamera');

        });
        // this.input.on('gameobjectup', function (pointer, gameobject) {

        //     if (gameobject === backbutton)
        //     {
        //         console.log("backbtn")
        //         this.scene.start('MainGame');
        //         // this.scene.start('WrapinCamera');
        //     }
    
        // });
        this.addCards();

    }

    addCards() {
        var frames = this.textures.get('cards').getFrameNames();

    var x = 100;
    var y = 100;

    for (var i = 0; i < 64; i++)
    {
        var image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive({ draggable: true });

        x += 4;
        y += 4;
    }

    this.input.on('dragstart', function (pointer, gameObject) {

        this.children.bringToTop(gameObject);

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    }

    addGerm (area, animation)
    {
        let start = area.getRandomPoint();

        let germ = this.add.sprite(start.x, start.y).play(animation).setScale(2);
        
        let durationX = Phaser.Math.Between(4000, 6000);
        let durationY = durationX + 3000;

        this.tweens.add({
            targets: germ,
            x: {
                getStart: (tween, target) => {
                    return germ.x;
                },
                getEnd: () => {
                    return area.getRandomPoint().x;
                },
                duration: durationX,
                ease: 'Linear'
            },
            y: {
                getStart: (tween, target) => {
                    return germ.y;
                },
                getEnd: () => {
                    return area.getRandomPoint().y;
                },
                duration: durationY,
                ease: 'Linear'
            },
            repeat: -1
        });
    }
}
