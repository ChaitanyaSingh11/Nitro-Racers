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
    car1 = createSprite(390, 200);
    car1.addImage("car1_Img", car1_Img);
    car2 = createSprite(590, 200);
    car2.addImage('car2_Img', car2_Img);
    car3 = createSprite(790, 200);
    car3.addImage('car3_Img', car3_Img);
    car4 = createSprite(990, 200);
    car4.addImage('car4_Img', car4_Img);
    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if (allPlayers !== undefined) {
      background('#666666');
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      image(logo, width / 2, camera.position.y - 350);
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
          camera.position.x = cars[index - 1].x;
          camera.position.y = cars[index - 1].y;
          // cars[index - 1].shapeColor = "Red";
          stroke(10);
          fill("Red");
          ellipse(cars[index - 1].x, y, 60, 60);
          if (keyIsDown(LEFT_ARROW)) {
            cars[index - 1].x -= 10;
          } else if (keyIsDown(RIGHT_ARROW)) {
            cars[index - 1].x += 10;
          }
        }
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50
      player.update();
    }
    if (player.distance > 3700) {
      gameState = 2;
      player.rank++;
      Player.updateCarsAtEnd(player.rank);
      player.update();
    }

    drawSprites();
  }

  end() {
    background(end);
    console.log("Game Finished " + displayHeight);
    // different length of track according to displayHeight
    if (displayHeight == 720)
      trackLength = 3500;
    else
      trackLength = 3700;
    for (let pl in allPlayers) {
      if (allPlayers[pl].distance > trackLength && player.rank == 1)
        console.log(allPlayers[pl].name + " Won !!")
    }
    console.log("Rank : " + player.rank);

    if (player.rank == 4) {
      imageMode(CENTER);
      camera.position.x = displayWidth / 2;
      image(leaderboard, camera.position.x / 2 + 300, camera.position.y + 50, 550, 550);
      image(trophy, camera.position.x / 2 + 300, camera.position.y - 290, 300, 300);
      fill("Maroon");
      textAlign(CENTER);
      textSize(32);
      textFont('Algerian');
      for (let pl in allPlayers) {
        let y = camera.position.y + allPlayers[pl].rank * 100;
        text(allPlayers[pl].name, displayWidth / 2, camera.position.y + 50 + allPlayers[pl].rank * 85 - 195);
        console.log(y);
      }
    }
  }
}