class Node {
  constructor(adress) {
    this.adress = adress;
    this.possiblePaths = [];
  }

  getPaths() {
    return this.possiblePaths;
  }

  addPath(adress) {
    this.possiblePaths.push(adress);
  }
}

module.exports = Node;
