// TODO does workers share variables reference?
class Crawler {
  constructor(currentNetwork, startAddress, endAddress) {
    this.startAddress = startAddress;
    this.endAddress = endAddress;
    this.network = currentNetwork;
    this.visitedNodes = [];
    this.previousNode = {};
    this.thereIsPath = true;
  }

  testConnection(output) {
    let result;
    if (this.isSought(this.startAddress)) {
      result = this.network.nodeAt(this.startAddress);
    } else {
      result = this.findConnection();
    }
    output(result);
  }

  isSought(node) {
    return node.adress === this.endAddress; // TODO might change depending on adress format
  }

  findConnection() {
    this.setStartingNode();
    while (this.thereIsPath) {
      const currentNode = this.goToNextNode();
      if (this.isSought(currentNode)) {
        return 'Connection existis';
      }
      this.visitedNodes.push(currentNode.adress);
      this.previousNode = currentNode;
    }

    return 'No connection';
  }

  setStartingNode() {
    this.visitedNodes.push(this.startAddress);
    const startingNode = this.network.nodeAt(this.startAddress);
    this.previousNode = startingNode;
  }

  goToNextNode() {
    const paths = this.getUnvisitedPaths();
    if (paths.length === 0) {
      this.thereIsPath = false;
      return null;
    }
    const randomIndex = Math.floor(Math.random() * paths.length);
    return this.network.nodeAt(paths[randomIndex]);
  }

  getUnvisitedPaths() {
    const direct = this.getDirectPathsFromPrev();
    if (direct.length === 0) {
      const indirect = this.getIndirectPath();
      return indirect;
    }
    return direct;
  }

  getDirectPathsFromPrev() {
    const avaiablePaths = this.previousNode.getPaths();
    return avaiablePaths.filter(
      (path) => this.visitedNodes.indexOf(path) === -1,
    );
  }

  // TODO FIX INDIRECT

  getIndirectPath() {
    return this.visitedNodes.reduce((acc, address) => {
      const nodePaths = this.network.nodeAt(address).getPaths();

      nodePaths.forEach((nodePath) => {
        if (this.visitedNodes.indexOf(nodePath) === -1) {
          acc.push(nodePath);
        }
      });

      return acc;
    }, []);
  }
}

module.exports = Crawler;

// go to first node
// is it destination?
//  yes => weee im done
//  no?
//    this.visitedNodes.push(current node with possible paths)
//
//    does this node lead to node I didn't visit?
//      YES
//        go to next node (can be random)
//      NO
//        Are there any more nodes I visited with connection to a node I didnt visit?
//          Yes =>  Teleport
//          No => GAME OVER :<

// READ ABOUT NODE WORKERS!
