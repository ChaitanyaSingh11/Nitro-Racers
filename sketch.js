var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

let cars = [];
let car1, car2, car3, car4;
// images' variables
let car1_Img, car2_Img, car3_Img, car4_Img;
let trackImg;

function preload() {
  car1_Img = loadImage("images/car1.png");
  car2_Img = loadImage("images/car2.png");
  car3_Img = loadImage("images/car3.png");
  car4_Img = loadImage("images/car4.png");
  trackImg = loadImage("images/track.jpg");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw() {
  if (playerCount === 4) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();
  }

  if(gameState == 2)
    game.end();
}