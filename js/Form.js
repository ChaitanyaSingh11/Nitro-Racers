class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.greeting.addClass('greet');
    this.reset = createButton('Reset');
    this.reset.addClass('reset');
    this.image = createImg('images/racer.png');
  }
  hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.image.hide();
  }

  display() {
    var title = createElement('h2')
    title.html("Car Racing Game");
    title.addClass('title');
    title.position(displayWidth / 2 - 600, 0);

    this.reset.position(displayWidth - 100, 20);
    this.reset.mousePressed(() => {
      player.updateCount(0);
      game.update(0);
      Player.updateCarsAtEnd(0);
      location.reload();
    });
    this.reset.size(70, 70);

    this.input.position(displayWidth / 2 - 150, displayHeight / 2 - 80);
    this.input.addClass('input');

    this.button.position(displayWidth / 2 - 50, displayHeight / 2 + 50);
    this.button.addClass('play');
    this.image.position(70, 150);
    this.image.hide();
    this.button.mousePressed(() => {
      this.image.show();
      this.input.hide();
      this.button.hide();
      title.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name + " !")
      this.greeting.position(displayWidth / 2 - 350, displayHeight / 4 - 150);
    });

  }
}