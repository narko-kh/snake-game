const $ = document;

const canvas = $.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let scale = 10;

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale;
  this.ySpeed = 0;

  this.total = 0
  this.tail = []

  this.draw = () => {
    ctx.fillStyle = "white";

    this.tail.forEach(index => {
        ctx.fillRect(index.x, index.y, scale, scale);
    })

    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.updateLocation = () => {
    for (let i = 0; i < this.tail.length -1; i++) {
        this.tail[i] = this.tail[i + 1]
    }

    this.tail[this.total - 1] = {x: this.x, y: this.y}

    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.y > canvas.height) {
      this.y = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    } else if (this.y < 0) {
      this.y = canvas.height;
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  };

  this.changeDirection = (direction) => {
    if (direction === "Left") {
      this.xSpeed = -scale;
      this.ySpeed = 0;
    } else if (direction === "Up") {
      this.xSpeed = 0;
      this.ySpeed = -scale;
    } else if (direction === "Right") {
      this.xSpeed = scale;
      this.ySpeed = 0;
    } else if (direction === "Down") {
      this.xSpeed = 0;
      this.ySpeed = scale;
    }
  };

  this.isEatFood = food => {
    if (this.x === food.x && this.y === food.y) {
        this.total++
        return true
    }
    return false
  }
}

function Food() {
    this.x = 0
    this.y = 0

    this.setRandomFoodLocation = () => {
        this.x = (Math.floor(Math.random() * (canvas.width / scale))) * scale
        this.y = (Math.floor(Math.random() * (canvas.height / scale))) * scale
    }

    this.draw = () => {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, scale, scale)
    }
}

window.addEventListener("load", () => {
  let snake = new Snake();

  let snakeFood = new Food()
  snakeFood.setRandomFoodLocation()

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw();
    snake.updateLocation();

    if (snake.isEatFood(snakeFood)) {
        snakeFood.setRandomFoodLocation()
    }
    snakeFood.draw()
}, 150);


  window.addEventListener("keydown", (e) => {
    let direction = e.key.replace("Arrow", "");

    snake.changeDirection(direction);
  });
});
