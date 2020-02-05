let marker = document.querySelector("#board");

let path = [
  { x1: 0, y1: 0, x2: 4, y2: 0 },
  { x1: 4, y1: 0, x2: 4, y2: 4 },
  { x1: 4, y1: 4, x2: 6, y2: 4 }
];

/*
takes a path structured like 
[{"x1":0,"y1":0,"x2":4,"y2":0},{"x1":4,"y1":0,"x2":4,"y2":4},{"x1":4,"y1":4,"x2":6,"y2":4}]
and draw the path the ennemy will be walking on
*/
function makePath(path) {
  path.forEach(box => {
    let abox = document.createElement("a-entity");
    abox.setAttribute("geometry", {
      primitive: "box",
      depth: box.y2 - box.y1,
      width: box.x2 - box.x1
    });
    abox.setAttribute("position", {
      x: (box.x1 + box.x2) / 2,
      y: 0.5,
      z: (box.y1 + box.y2) / 2
    });
    abox.setAttribute("material", "color", "#808080");
    marker.appendChild(abox);
    let node = document.createElement("a-entity");
    node.setAttribute("geometry", {
      primitive: "box",
      depth: 1.2,
      width: 1.2,
      height: 1.2
    });
    node.setAttribute("position", { x: box.x1, y: 0.5, z: box.y1 });
    node.setAttribute("material", "color", "#404040");
    marker.appendChild(node);
  });
  let finalNode = document.createElement("a-entity");
  finalNode.setAttribute("geometry", {
    primitive: "box",
    depth: 1.2,
    width: 1.2,
    height: 1.2
  });
  finalNode.setAttribute("position", {
    x: path[path.length - 1].x2,
    y: 0.5,
    z: path[path.length - 1].y1
  });
  finalNode.setAttribute("material", "color", "red");
  marker.appendChild(finalNode);
}
class Ennemy {
  constructor(path) {
    this.path = path;
    this.pathIndex = 0;
    this.hp = 100;
    this.x = this.path[0].x1;
    this.y = this.path[0].y1;
    this.id = Ennemy.id;
    Ennemy.id += 1;

    let ennemy = document.createElement("a-entity");
    ennemy.setAttribute("geometry", {
      primitive: "sphere",
      radius: "0.5"
    });
    ennemy.setAttribute("position", { x: this.x, y: 1.5, z: this.y });
    ennemy.setAttribute("material", "color", "red");
    ennemy.id = "ennemy" + this.id;
    marker.appendChild(ennemy);
  }
  remove() {
    document.getElementById("ennemy" + this.id).remove();
  }
  update() {
    if (
      this.distance(
        this.x,
        this.y,
        this.path[this.pathIndex].x2,
        this.path[this.pathIndex].y2
      ) < 0.1
    ) {
      this.pathIndex += 1;
      if (this.pathIndex > this.path.length - 1) {
        return true;
      }
    }
    const direction = this.getDirection();
    //console.log(direction)
    this.x += 0.005 * direction[0];
    this.y += 0.005 * direction[1];
    let ennemy = document.getElementById("ennemy" + this.id);
    ennemy.setAttribute("position", { x: this.x, y: 1.5, z: this.y });
    //console.log(this.x,this.y)
    return false;
  }
  distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
  getDirection() {
    let directionY;
    let directionX;

    const dx = this.path[this.pathIndex].x1 - this.path[this.pathIndex].x2;
    if (dx != 0) {
      directionX = -dx / Math.abs(dx);
    } else {
      directionX = 0;
    }
    const dy = this.path[this.pathIndex].y1 - this.path[this.pathIndex].y2;
    if (dy != 0) {
      directionY = -dy / Math.abs(dy);
    } else {
      directionY = 0;
    }
    return [directionX, directionY];
  }
}
Ennemy.id = 0;
let listEnnemy = [];
let hp = 100;
listEnnemy.push(new Ennemy(path));

function update() {
  requestAnimationFrame(update);
  let reached = [];
  listEnnemy.forEach((ennemy, index) => {
    if (ennemy.update()) {
      reached.push(index);
    }
  });
  reached.forEach(ennemyReached => {
    listEnnemy[ennemyReached].remove();
    listEnnemy.splice(ennemyReached, 1);
    hp -= 1;
    console.log(hp);
  });
}
update();

makePath(path);
