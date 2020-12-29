class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200);
    car2 = createSprite(300, 200);
    car3 = createSprite(500, 200);
    car4 = createSprite(700, 200);
    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      var display_position = 130;
      let index = 0,
        x = 0,
        y = 0;
      for (var plr in allPlayers) {

        index += 1;
        // x += 200;
        y = displayHeight - allPlayers[plr].distance;
        // cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index == player.index) {
          camera.position.x = cars[index-1].x;
          camera.position.y = cars[index - 1].y;
          cars[index - 1].shapeColor = "Red";
          if (keyIsDown(LEFT_ARROW)) {
            cars[index - 1].x -= 10;
          }
          else if(keyIsDown(RIGHT_ARROW)){
            cars[index-1].x += 10;
          }
        }
        

        // display_position += 20;
        // textSize(15);
        // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position)
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50
      player.update();
    }


    drawSprites();
  }
}