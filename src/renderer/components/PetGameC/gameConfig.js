import Phaser from 'phaser';
import LoadingScreen from './LoadingScreen.js';

// var gameConfig = function() {
//     this.game = new Phaser.Game({
//       type: Phaser.AUTO,
//       parent: 'canvascontainer',
//       dom: {createContainer:true},
//       width: 800,
//       height: 600,
//       // scene: MyGame,
//       // scene: [WrapinCamera, Boot, Preloader, MainMenu, MainGame],
//       // scene: [ Boot, Preloader, MainMenu, MainGame ],
      
//   });

//   this.game.scene.add('LoadingScreen', LoadingScreen,true);
//   // this.game.state.start('LoadingScreen');
//   // this.game.scene.start('LoadingScreen');
// }
var gameConfig = function() {
  //   this.game = new Phaser.Game({
  //     type: Phaser.CANVAS,
  //     parent: 'canvascontainer',
  //     dom: {createContainer:true},
  //     width: 800,
  //     height: 600,
  //     scene: LoadingScreen,
  //     // scene: [WrapinCamera, Boot, Preloader, MainMenu, MainGame],
  //     // scene: [ Boot, Preloader, MainMenu, MainGame ],
      
  // });
    // this.game.scene.add('LoadingScreen', LoadingScreen,true);
    // this.game.scene.start('LoadingScreen');
    this.istest = 2;
}
gameConfig.prototype.setFinalScreenSize = function(){
  configObj.game.scale.pageAlignHorizontally = true;
  configObj.game.scale.pageAlignVertically = true;
  configObj.game.scale.setShowAll();
  configObj.game.scale.refresh();
}

gameConfig.prototype.addPanel = function(){
  // if(!this.isDevice){
      this.game.add.sprite(0 ,0, "leftBar");
      this.game.add.sprite(860 ,0, "rightBarLevelUp");
  // }
}

window.configObj = new gameConfig();

function launch(containerId) {
  // this.tempid = containerId;
  configObj.game =  new Phaser.Game({
    type: Phaser.CANVAS,
    parent: 'canvascontainer',
    dom: {createContainer:true},
    width: 800,
    height: 600,
    scene: LoadingScreen,
    // scene: [WrapinCamera, Boot, Preloader, MainMenu, MainGame],
    // scene: [ Boot, Preloader, MainMenu, MainGame ],
    
});
return configObj.game;
// return this.game;


}

export default launch
export { launch }