class Piece {
  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  spawn() {
    this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
    this.shape = SHAPES[this.typeId];
    this.color = COLORS[this.typeId];
    this.x = 0;
    this.y = 0;
    this.hardDropped = false;
  }

  draw() {
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = this.color;
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
          this.ctx.strokeStyle = 'black'; // Border color
          this.ctx.lineWidth = 0.05; // Border width
          this.ctx.strokeRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  drawGhost() {
    const ghost = { ...this, y: this.y };

    while (board.valid(ghost)) {
      ghost.y++;
    }
    ghost.y--;

    ghost.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Ghost piece color
          this.ctx.fillRect(ghost.x + x, ghost.y + y, 1, 1);
          this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'; // Border color
          this.ctx.lineWidth = 0.05; // Border width
          this.ctx.strokeRect(ghost.x + x, ghost.y + y, 1, 1);
        }
      });
    });
  }

  move(p) {
    if (!this.hardDropped) {
      this.x = p.x;
      this.y = p.y;
    }
    this.shape = p.shape;
  }

  hardDrop() {
    this.hardDropped = true;
  }

  setStartingPosition() {
    this.x = this.typeId === 4 ? 4 : 3;
  }

  randomizeTetrominoType(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes + 1);
  }
}