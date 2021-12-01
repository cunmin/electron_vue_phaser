// var Game = {};
// Game.LoadingScreen = function(){
// };
var result;
var boxX = 0;
var boxY = 0;

export default class LoadingScreen extends Phaser.Scene {

  preload() {
    // configObj.game.load.image("back", "src/renderer/assets/back.png");
    this.load.image('back', 'src/renderer/assets/back.png');
    this.load.image("leftBar", "src/renderer/assets/images/game/left_side_bar.jpg");
    this.load.image("rightBarLevelUp", "src/renderer/assets/images/levelup/right_bar.jpg");
    this.load.image('phaser', 'src/renderer/assets/diamond.png');
    this.load.image('block', 'src/renderer/assets/block.png');
    this.load.audio('splash_screen_bg', ['src/renderer/assets/splash_screen_bgSound.mp3', 'src/renderer/assets/splash_screen_bgSound.ogg']);
  }
  create() {
    // configObj.addPanel();
    console.log("LoadingScreen====", configObj.istest);
    var backbutton = this.add.image(170, 230, 'back').setInteractive();
    var sprite1 = this.add.sprite(400, 200, 'leftBar').setInteractive();
    // sprite1.pivot
    sprite1.setFrame()
    sprite1.on('pointerdown',function(pointer){
      if(pointer.leftButtonDown()){
        console.log('leftButtonDown');
      }
    });
    sprite1.on('pointerup',function(){
      console.log('pointerup');
    })

    var texture = this.textures.createCanvas('aatest', 256, 256);

    var ctx = texture.context;

    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
    ctx.stroke();

    texture.refresh();

    this.add.image(300, 200, 'aatest');
    // sprite1.scaleX
    var progress = this.add.graphics();
    progress.clear();
    progress.fillStyle(0xffffff,1);
    progress.fillRect(100,370,300,60);

    var bg_sound = this.sound.add("splash_screen_bg");
    console.log("-----",bg_sound.key) 
    // var marker = this.add.image(100, 300, 'block').setAlpha(0.3);
    var image = this.add.image(200, 300, 'block').setInteractive();

    var anim = this.tweens.add({
        targets: image,
        x: 700,
        duration: 3000,
        ease: 'Sine.easeIn',
        delay: 1000,
        
    });

    image.on('pointerdown', function () {
      console.log("pointerdown")
      // anim.restart();

  });

  // console.log("anim.complete");
  //     anim.restart();

    // anim.play();
    // var self = this;
    anim.setCallback('onComplete',function() {
      console.log("anim.complete");
      anim.restart();
      
      // anim.resume();
      // anim.makeActive();
      
    },[],this);

    var temptimer = this.game.getTime()
    // temptimer.
    // anim.complete(()=>{
    //   console.log("anim.complete");
    // })

    // const block = this.add.image(100, 100, 'block');

    // block.tween({ x: 600, duration: 1000 });
    // this.monsterEnabledLayer = this.add.group();
    // this.monsterEnabledLayer.setDepth(2);

    // this.layer = this.add.container();
    // this.layer.setDepth(2);

    // this.input.activePointer.leftButtonDown = this.mouseMoveCallBack.bind(this);
    // this.input.mousePointer.leftButtonDown = this.mouseMoveCallBack.bind(this);
    // this.sys.canvas.ontouchmove
    this.game.canvas.onmousemove = function (e) {
      console.log('onmousemove')
  };

    // this.add.sprite
    // backbutton.addListener()
    // var tree = Phaser.Structs.RTree();
    // var w = this.sys.textures.getFrame('phaser').width;
    // var h = this.sys.textures.getFrame('phaser').height;

    // for (var i = 0;i < 512;i++) {
    //   var x = Phaser.Math.Between(0, 800);
    //   var y = Phaser.Math.Between(0, 600);

    //   var sprite = this.add.image(x, y, 'phaser').setOrigin(0);

    //   tree.insert({
    //     left: x,
    //     top: y,
    //     right: x + w,
    //     bottom: y + h,
    //     sprite: sprite,
    //     w: w,
    //     h: h
    //   });
    // }

    // result = tree.search({
    //   minX: 0,
    //   minY: 0,
    //   maxX: 256,
    //   maxY: 256
    // });

    // this.input.on('pointermove', function (pointer) {

    //   boxX = pointer.x;
    //   boxY = pointer.y;

    //   result = tree.search({
    //     minX: boxX,
    //     minY: boxY,
    //     maxX: boxX + 256,
    //     maxY: boxY + 256
    //   });

    // });

    // this.events.on('render', this.render, this);
  }

  mouseMoveCallBack(){
    console.log("mouseMoveCallBack");

  }

  render() {
    console.log("render()");
    var ctx = this.sys.game.context;
    // var ctx =  this.add.graphics();
  
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, 256, 256);
  
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
  
    result.forEach(function (s) {
  
      ctx.fillRect(s.left, s.top, s.w, s.h);
  
    });
  }

}




