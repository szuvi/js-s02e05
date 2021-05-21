class Node {
  constructor(address) {
    this.address = address;
    this.possiblePaths = [];
  }

  getPaths() {
    return this.possiblePaths;
  }

  addPath(address) {
    this.possiblePaths.push(address);
  }

  static getPathsExternal(node) {
    return node.possiblePaths;
  }
}

module.exports = Node;
