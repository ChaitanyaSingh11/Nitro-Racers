class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
  }

  display() {
    var title = createElement('h2')
    title.html("Car Racing Game");
    title.position(displayWidth / 2 - 50, 0);

    this.reset.position(displayWidth - 100, 20);
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      Player.updateCarsAtEnd(0);
    });
    this.reset.size(70,70);
    this.reset.style('border-radius:50%');
    this.reset.style('background:Red');
    this.reset.style('color:#ffffff');
    this.reset.style('font-size:22px');

    this.input.position(displayWidth / 2 - 40, displayHeight / 2 - 80);
    this.button.position(displayWidth / 2 + 30, displayHeight / 2);

    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      title.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth / 2 - 70, displayHeight / 4);
    });

  }
}