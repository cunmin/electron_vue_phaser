//shift octaves left / right
var lower_offset = 24, upper_offset = 36, click_flag = true
// piano bg co-ordinates

var pX = 400
var pY = 300

var keys_down = {}
//key map
var lower_octave = [65, 90, 83, 88, 67, 70, 86, 71, 66, 78, 74, 77, 75, 188, 76, 190, 191, 222]
var upper_octave = [49, 81, 50, 87, 69, 52, 82, 53, 84, 89, 55, 85, 56, 73, 57, 79, 80, 189, 219, 187, 221]

//note markers
var cursor_low = [12, 3, 4, 6, 8, 9, 11, 13, 15, 16, 18, 20, 21, 23, 25, 27, 28, 30, 32, 33, 35, 37, 39, 40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59, 61, 63, 64, 66, 68, 69, 71, 73, 75, 76, 78, 80, 81, 83, 85, 87, 88]
var cursor_high = { 2: 15, 5: 62, 7: 89, 10: 135, 12: 161, 14: 186, 17: 233, 19: 259, 22: 303, 24: 329, 26: 353, 29: 400, 31: 426, 34: 470, 36: 496, 38: 522, 41: 566, 43: 592, 46: 636, 48: 662, 50: 688, 53: 732, 55: 758, 58: 802, 60: 828, 62: 854, 65: 898, 67: 924, 70: 970, 72: 996, 74: 1022, 77: 1067, 79: 1093, 82: 1138, 84: 1164, 86: 1190 }


export default class PianoGame extends Phaser.Scene {
  constructor() {
    super('PianoGame')
  }

  preload() {
    this.load.setPath('src/renderer/assets/piano/');
    this.load.image('keys', 'img/p.png')
    this.load.image('body', 'img/bg.png')

    // this.load.setPath('src/renderer/assets/piano/');
    this.load.audio('notes', ['aud/long-key.mp3'])
    // this.load.audio('notes', [ 'aud/music.ogg', 'aud/music.m4a', 'aud/music.mp3' ]);
    // this.load.audio('appear', [ 'appear.ogg', 'appear.m4a', 'appear.mp3' ]);
  }

  create() {


    // this.physics.
    this.add.sprite(pX - 12, pY - 100, 'body')
    this.add.sprite(pX, pY + 200, 'keys')
    var backbutton = this.add.image(70, 50, 'back').setInteractive();
    backbutton.setScale(0.5);
    backbutton.on('pointerdown', () => {
      console.log("backbtn")
      this.scene.start('WrapinCamera');

    });

    // notes = this.add.audio('notes')
    this.notes = this.sound.add('notes')
    // this.notes.play();
    this.notes.allowMultiple = true
    var secs = 0.0
    var duration = 1

    for (var i = 1;i <= 88;i++) {
      // this.notes.addMarker(i, secs++, duration)
      this.notes.addMarker({ name: i.toString(), start: secs++, duration: duration })
    }
    var self = this;
    this.input.keyboard.on('keydown', function (event) {
      var pressed = event.keyCode
      if (!(pressed in keys_down)) {
        keys_down[pressed] = true
        if (pressed == 37) {
          //left arrow
          if (lower_offset - 12 >= 0) {
            lower_offset -= 12
            upper_offset -= 12
          }
        }
        if (pressed == 39) {
          //right arrow
          if (lower_offset + 12 <= 60) {
            lower_offset += 12
            upper_offset += 12
          }
        }

        var audio_tag = -1
        if (upper_octave.indexOf(pressed) != -1)
          audio_tag = upper_octave.indexOf(pressed) + upper_offset

        else if (lower_octave.indexOf(pressed) != -1)
          audio_tag = lower_octave.indexOf(pressed) + lower_offset

        self.play_note(audio_tag)

      }
    })

    this.input.keyboard.on('keyup', function (event) {
      delete keys_down[event.keyCode]
    })

  }

  update() {
    console.log("update()--click_flag--", click_flag)
    //touch事件
    if (this.game.input.activePointer.isDown && click_flag) {
      this.clicked();
    } 
    else{
      click_flag = true
    }
    //没有isUp事件
    // if (this.game.input.activePointer.isUp) click_flag = true
  }

  clicked() {
    click_flag = false
    var mX = this.game.input.mousePointer.x
    var mY = this.game.input.mousePointer.y
    console.log("mx===", mX)
    console.log("my===", mY)
    if (mX >= pX) {
      if (pY < mY && mY < 460) {
        if (mY < 360) {
          x = mX - 50
          var played = false
          for (this.audio_tag in cursor_high) {
            if (cursor_high[audio_tag] <= x && cursor_high[audio_tag] + 16 >= x) {
              this.play_note(this.audio_tag)
              played = true
              break
            }
          }
          if (!played) play_note(cursor_low[Math.floor((mX - 50) / 24)])
        }

        else {
          this.audio_tag = cursor_low[Math.floor((mX - 50) / 24)]
          this.play_note(this.audio_tag)
        }
      }
    }
  }

  play_note(audio_tag) {
    if (audio_tag != -1 && 1 <= audio_tag && 88 >= audio_tag) {
      console.log("audio_tag===", audio_tag)
      this.notes.play(audio_tag.toString())
      if (audio_tag in cursor_high) {
        this.draw(cursor_high[audio_tag], 345)
      }
      else this.draw(3 + cursor_low.indexOf(audio_tag) * 24, 437)
    }

  }

  draw(x, y) {
    // var graphics = this.add.graphics(pX + x, y)
    var graphics = this.add.graphics()
    graphics.lineStyle(2, 0x0000FF, 1)
    // graphics.beginFill(0x0000FF, 0.5)
    // graphics.drawRect(0, 0, 18, 18)
    // graphics.endFill(0x0000FF, 0.5)
    graphics.fillStyle(0x0000FF, 0.5);
    graphics.fillRect(100 + x, y, 18, 18);
    setTimeout(function () { graphics.destroy() }, 100)
  }
}