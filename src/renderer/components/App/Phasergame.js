import Phaser from 'phaser';
import logoImg from '../../assets/icon.png';
import Boot from './Boot.js';
import Preloader from './Preloader.js';
import MainMenu from './MainMenu.js';
import MainGame from './Game.js';
import PianoGame from './Piano/PianoGame';
import MatchGame from './match_pairs/MatchGame'
import RunnerGame from './infinite_runner/Game'
import RunnerGameOver from './infinite_runner/RunnerGameOver';
// var tempid;

class WrapinCamera extends Phaser.Scene {
    constructor() {
        super('WrapinCamera');
    }

    preload() {
        this.load.image('back', 'src/renderer/assets/back.png');
        this.load.html('nameform', 'src/renderer/assets/loginform.html');
        this.load.atlas('spriteset', 'src/renderer/assets/match_pairs/spritesheet.png', 'src/renderer/assets/match_pairs/spritesheet.jsona')
    }

    create() {
        // var atlastexture = this.textures.get('match')
        // atlastexture.get
        this.add.sprite(200, 200, 'spriteset', 'covershape.png');
        this.graphics = this.add.graphics();

        this.shapes = new Array(15).fill(null).map(
            () => new Phaser.Geom.Circle(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), Phaser.Math.Between(25, 75))
        );

        this.rect = Phaser.Geom.Rectangle.Clone(this.cameras.main);
        this.additems();
        //背景抖动效果
        // this.input.on('pointerdown', function () {
        //     this.cameras.main.shake(500);
        // }, this);
        // Phaser.Display.Align.In.BottomCenter()
        this.addhtmllogin();

        var style = {
            'background-color': 'lime',
            'width': '190px',
            'height': '50px',
            'font': '28px Arial',
            'font-weight': 'bold',
            'padding-top': '10px',
            'padding-left': '40px',
        };

        var element2 = this.add.dom(650, 80, 'div', style, 'Phaser 3');



    }
    addhtmllogin() {
        var text = this.add.text(300, 120, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px ' });

        var element = this.add.dom(400, 600).createFromCache('nameform');
        // element.width = 200;
        // element.height = 100;

        element.setPerspective(800);

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '') {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the login form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    this.scene.tweens.add({
                        targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                        onComplete: function () {
                            element.setVisible(false);
                        }
                    });

                    //  Populate the text with whatever they typed in as the username!
                    text.setText('Welcome ' + inputUsername.value);
                }
                else {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    }

    additems() {
        const button1 = this.add.text(10, 10, 'Germs', { backgroundColor: '#0000aa', fixedWidth: 210, align: 'center' });
        const button2 = this.add.text(10, 48, 'Hide Parent Layer', { backgroundColor: '#0000aa', fixedWidth: 210, align: 'center' });
        const piano_btn = this.add.text(10, 86, 'Piano', { backgroundColor: '#0000aa', fixedWidth: 210, align: 'center' })
        const match_pairs = this.add.text(10, 124, 'Match Pairs', { backgroundColor: '#0000aa', fixedWidth: 210, align: 'center' })
        const infinite_runner = this.add.text(10, 162, 'Infinite Runner', { backgroundColor: '#0000aa', fixedWidth: 210, align: 'center' })

        button1.setPadding(0, 8, 0, 8);
        button2.setPadding(0, 8, 0, 8);
        piano_btn.setPadding(0, 8, 0, 8);
        match_pairs.setPadding(0, 8, 0, 8);
        infinite_runner.setPadding(0, 8, 0, 8);

        button1.setInteractive();
        button2.setInteractive();
        piano_btn.setInteractive();
        match_pairs.setInteractive();
        infinite_runner.setInteractive();

        button1.on('pointerdown', () => {

            console.log("button1");
            this.scene.start('Boot');
        });

        button2.on('pointerdown', () => {

            console.log("button2");

        });

        piano_btn.on('pointerdown', () => {

            console.log("piano_btn");
            this.scene.start('PianoGame');
        });
        match_pairs.on('pointerdown', () => {
            console.log("match_pairs");
            this.scene.start('MatchGame');
        });
        infinite_runner.on('pointerdown', () => {
            console.log("infinite_runner");
            window.global = {
                score: 0,
                flag: false
            }
            this.scene.start('RunnerGame');
        })
    }

    update() {
        this.shapes.forEach(function (shape, i) {
            shape.x += (1 + 0.1 * i);
            shape.y += (1 + 0.1 * i);
        });

        Phaser.Actions.WrapInRectangle(this.shapes, this.rect, 72);

        this.draw();
    }

    // Locals methods, they are not part of Phaser.scene
    color(i) {
        return 0x001100 * (i % 15) + 0x000033 * (i % 5);
    }

    draw() {
        this.graphics.clear();

        this.shapes.forEach((shape, i) => {
            this.graphics
                .fillStyle(this.color(i), 0.5)
                .fillCircleShape(shape);
        }, this);
    }
}



function launch(containerId) {
    // this.tempid = containerId;
    return new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerId,
        dom: { createContainer: true },
        width: 800,
        height: 640,
        // scene: MyGame,
        scene: [WrapinCamera,RunnerGame,RunnerGameOver, MatchGame, PianoGame, Boot, Preloader, MainMenu, MainGame],
        // scene: [ Boot, Preloader, MainMenu, MainGame ],
        physics: {
            default: 'arcade',
            arcade: { gravity: { y: 200 }, debug: true }
        },
        backgroundColor: 0x373F6C
    });
}

export default launch
export { launch }