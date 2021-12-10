export default class MatchGame extends Phaser.Scene {
  constructor() {
    super('MatchGame')
  }

  preload() {
    // this.load.setPath('src/renderer/assets/piano/');
    // this.load.image('keys', 'img/p.png')
    // this.load.image('body', 'img/bg.png')


  }

  create() {
    this.toggle = true;
    this.level = 4;

    this.shapes = [];
    this.solution = [];
    this.shapeindex = 0;

    this.shape1 = null;
    this.shape2 = null;
    this.totaltime = 0;
    this.totalclicks = 0;
    this.placeBoxes('4x2');
  }

  openShape(a) {
    console.log("openShape==", a)
    console.log(a.no);
    // this.blipsound.play();
    this.totalclicks++;
    var win = false;
    // var out_tween = this.add.tween(a).to({ alpha: 0 }, 100, Phaser.Easing.Sinusoidal.Out, true);
    var out_tween = this.tweens.add({
      targets: a,
      alpha: 0,
      duration: 100,
      ease: 'Sine.easeOut',
      // yoyo: true,
    });
    // var self = this;
    var in_tween = () => {
      console.log("in_tween")
      // a.frameName = 'shape' + this.solution[a.no] + '.png';
      a.setFrame('shape' + this.solution[a.no] + '.png');
      // this.add.tween(a).to({ alpha: 1 }, 10, Phaser.Easing.Sinusoidal.In, true);
      this.tweens.add({
        targets: a,
        alpha: 1,
        duration: 10,
        ease: 'Sine.easeIn',
        // yoyo: true,
      });
      if (this.toggle) {
        this.shape1 = a;
        this.toggle = false;
        this.shape1.inputEnabled = false;
      }
      else {
        console.log("different===44444444444444444=")
        this.shape2 = a;
        // if(this.shape1==this.shape2){
        //     this.shape1.frameName = 'covershape.png';
        //     this.shape1.inputEnabled = true;
        // }
        // else{
        console.log("this.shape1====",this.shape1.frame.name)
        console.log("this.shap2====",this.shape2)
        if (this.shape1.frame.name != this.shape2.frame.name) {
          console.log("different====")
          // var temp_tween1 = this.add.tween(this.shape1).to({ alpha: 0 }, 100, Phaser.Easing.Sinusoidal.Out, true);
          // var temp_tween2 = this.add.tween(this.shape2).to({ alpha: 0 }, 100, Phaser.Easing.Sinusoidal.Out, true);
          var temp_tween1 = this.tweens.add({
            targets: this.shape1,
            alpha: 0,
            duration: 100,
            ease: 'Sine.easeOut',
            // yoyo: true,
          });
          var temp_tween2 = this.tweens.add({
            targets: this.shape2,
            alpha: 0,
            duration: 100,
            ease: 'Sine.easeOut',
            // yoyo: true,
          });
          temp_tween2.setCallback('onComplete',
            function () {
              // this.shape1.frameName = 'covershape.png';
              // this.shape2.frameName = 'covershape.png';
              console.log("dddddddddddddddddddd")
              this.shape1.setFrame('covershape.png');
              this.shape2.setFrame('covershape.png');

              // this.add.tween(this.shape1).to({ alpha: 1 }, 100, Phaser.Easing.Sinusoidal.Out, true);
              // this.add.tween(this.shape2).to({ alpha: 1 }, 100, Phaser.Easing.Sinusoidal.Out, true);
              this.tweens.add({
                targets: this.shape1,
                alpha: 1,
                duration: 100,
                ease: 'Sine.easeOut',
                // yoyo: true,
              });
              this.tweens.add({
                targets: this.shape2,
                alpha: 1,
                duration: 100,
                ease: 'Sine.easeOut',
                // yoyo: true,
              });
              this.shape1.inputEnabled = true;
            }

            , [], this)
          // temp_tween2.onComplete.add(
        }
        else {
          win = true;
          this.shape1.inputEnabled = false;
          this.shape2.inputEnabled = false;
          this.solution[this.shape1.no] = -1;
          this.solution[this.shape2.no] = -1;
          for (var i = 0;i < this.solution.length;i++) {
            if (this.solution[i] != -1) {
              win = false;
              break;
            }
          }
          if (win == true) {
            this.nextLevel();
          }
        }
        // }
        this.toggle = true;
      }

    }
    // out_tween.onComplete.add(in_tween, this);
    out_tween.setCallback('onComplete', function () {
      console.log('onComplete')
      in_tween();
    }, [], this)

  }

  placeBoxes(type) {
    this.shapes.length = 0;
    this.shapeindex = 0;
    this.solution.length = 0;
    // this.game.config.width
    switch (type) {
      case '2x2': for (var i = 0;i < 2;i++) {
        for (var j = 0;j < 2;j++) {
          this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX - 60 + 120 * j, this.world.centerY - 60 + 120 * i, 'spriteset');
          this.shapes[this.shapeindex].frameName = 'covershape.png';
          this.shapes[this.shapeindex].anchor.setTo(0.5, 0.5);
          this.shapeindex++;
        }
      }
        break;
      case '3x2': for (var i = 0;i < 2;i++) {
        for (var j = 0;j < 3;j++) {
          this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX - 120 + 120 * j, this.world.centerY - 60 + 120 * i, 'spriteset');
          this.shapes[this.shapeindex].frameName = 'covershape.png';
          this.shapes[this.shapeindex].anchor.setTo(0.5, 0.5);
          this.shapeindex++;
        }
      }
        break;
      case '4x2': for (var i = 0;i < 4;i++) {
        for (var j = 0;j < 2;j++) {
          this.shapes[this.shapeindex] = this.add.sprite(this.game.config.width / 2 - 60 + 120 * j, this.game.config.height / 2 - 190 + 120 * i, 'spriteset', 'covershape.png');
          // this.shapes[this.shapeindex].frameName = 'covershape.png';
          // this.shapes[this.shapeindex].setFrame('shape1.png');
          this.shapes[this.shapeindex].anchor = 0.5;
          this.shapeindex++;
        }
      }
        break;
      case '5x2': for (var i = 0;i < 3;i++) {
        for (var j = 0;j < 3;j++) {
          this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX - 120 + 120 * j, this.world.centerY - 190 + 120 * i, 'spriteset');
          this.shapes[this.shapeindex].frameName = 'covershape.png';
          this.shapes[this.shapeindex].anchor.setTo(0.5, 0.5);
          this.shapeindex++;
        }
      }
        this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX, this.world.centerY + 170, 'spriteset');
        this.shapes[this.shapeindex].frameName = 'covershape.png';
        this.shapes[this.shapeindex].anchor.setTo(0.5, 0.5);
        this.shapeindex++;
        break;
      case '6x2': for (var i = 0;i < 4;i++) {
        for (var j = 0;j < 3;j++) {
          this.shapes[this.shapeindex] = this.add.sprite(this.world.centerX - 120 + 120 * j, this.world.centerY - 190 + 120 * i, 'spriteset');
          this.shapes[this.shapeindex].frameName = 'covershape.png';
          this.shapes[this.shapeindex].anchor.setTo(0.5, 0.5);
          this.shapeindex++;
        }
      }
        break;
      default: break;
    }
    for (var i = 0;i < this.shapes.length;i++) {
      this.shapes[i].frameName = 'covershape.png';
      // this.shapes[i].scale.setTo(0.5,0.5);
      this.shapes[i].anchor = 0.5;
      this.shapes[i].no = i;
      this.shapes[i].inputEnabled = true;
      // this.shapes[i].events.onInputDown.add(this.openShape, this);
      this.shapes[i].setInteractive();
      // var self = this;
      this.shapes[i].on('pointerdown',
        // console.log("pointer x==",pointer.x)
        this.openShape.bind(this, this.shapes[i])
      );

      this.shapes[i].alpha = 0;
      // this.add.tween(this.shapes[i]).to({ alpha: 1 }, 1000, Phaser.Easing.Sinusoidal.Out, true);
      this.tweens.add({
        targets: this.shapes[i],
        alpha: 1,
        duration: 1000,
        ease: 'Sine.easeOut',
        // yoyo: true,
      });
    }
    for (var i = 0;i < this.shapes.length;i = i + 2) {
      this.solution[i] = i / 2 + 1;
      this.solution[i + 1] = i / 2 + 1;
    }
    // Phaser.Math.
    // this.math.shuffleArray(this.solution);
    console.log(this.solution);
  }
}