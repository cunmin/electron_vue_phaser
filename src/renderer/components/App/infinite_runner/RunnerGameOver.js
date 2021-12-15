

export default class RunnerGameOver extends Phaser.Scene
{
	constructor()
	{
		super('RunnerGameOver')

		this.textStyle = { font: "28px Comic Sans MS", stroke: '#ffffff', strokeThickness: 4, fill: "#BE5446", tabs: [100, 300] };
		
	}

	create()
	{
		
		
		const { width, height } = this.scale

		const x = width * 0.5
		const y = height * 0.5

		
		
		this.buildInterface()
		this.showScore()



		this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.stop('RunnerGameOver')
			this.scene.stop('RunnerGame')
			this.scene.start('RunnerGame')
		})

		this.add.text(x, y,  'Press SPACE to Play Again', {
			fontSize: '32px',
			color: '#FFFFFF',
			backgroundColor: '#000000',
			shadow: { fill: true, blur: 0, offsetY: 0 },
			padding: { left: 15, right: 15, top: 10, bottom: 10 }
		})
		.setOrigin(0.5)

		var backbutton = this.add.image(370, 50, 'back').setInteractive();
    backbutton.setScale(0.5);
    backbutton.on('pointerdown', () => {
      console.log("backbtn")
			this.scene.stop('RunnerGameOver')
			this.scene.stop('RunnerGame')
      this.scene.start('WrapinCamera');

    }).setScrollFactor(0);
	}
	
	buildInterface () {

		//User Inteface
		var bar = this.add.graphics();
		bar.fillStyle(0xfae013,1)
		bar.fillRect(0, 0, this.scale.width, 75);
		

		bar.fillStyle(0x49B8E7, 1);
		bar.fillRect(0, 75, this.scale.width, 10);
		

		bar = this.add.graphics();
		bar.fillStyle(0x6ac8ed, 1);
		bar.fillRect(0, 85, this.scale.width, 10);
		

		var barBottom = this.add.graphics();
		barBottom.fillStyle(0x6ac8ed, 1);
		barBottom.fillRect(0, this.scale.height - 100, this.scale.width, 95);
		

		barBottom = this.add.graphics();
		barBottom.fillStyle(0x49B8E7, 1);
		barBottom.fillRect(0, this.scale.height - 90, this.scale.width, 90);
		

		barBottom = this.add.graphics();
		barBottom.fillStyle(0xD3F939, 1);
		barBottom.fillRect(0, this.scale.height - 80, this.scale.width, 80);
		

		// scoreText = this.add.text(5, 5, 'Highscore', this.styleTextH);
		// scoreText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 2);

		// this.restartBtn = game.add.button(60, game.height - 40, 'restartBtn', function () {
		// 		this.game.state.start('Play');
		// }, this);
		// this.restartBtn.anchor.setTo(0.5, 0.5);
		// this.restartBtn.scale.setTo(0.5, 0.5);
		// this.restartBtn.input.useHandCursor = true;

		// this.menuBtn = game.add.button(300, game.height - 40, 'menuBtn', function () {
		// 		this.game.state.start('Menu');
		// }, this);
		// this.menuBtn.anchor.setTo(0.5, 0.5);
		// this.menuBtn.scale.setTo(0.8, 0.8);
		// this.menuBtn.input.useHandCursor = true;

}

	showScore () {
		var playerScore;

		if (localStorage.getItem('highscore') === null) {
				localStorage.setItem('highscore', global.score);
		}
		else if (global.score > localStorage.getItem('highscore')) {
				localStorage.setItem('highscore', global.score);
		}

		playerScore = this.add.text(this.scale.width/2, 180, 'Highscore - ' + localStorage.getItem('highscore'), this.textStyle);
		playerScore.anchor= 0.5;

		var currentScore = this.add.text(this.scale.width/2, 250, 'Your Score - ' + global.score, this.textStyle);
		currentScore.anchor=0.5;


}


}
