const Network = require('./Network');
const Node = require('./Node');

class Crawler {
  constructor(currentNetwork, startAddress, endAddress) {
    this.startAddress = startAddress;
    this.endAddress = endAddress;
    this.network = currentNetwork;
    this.visitedNodes = [];
    this.previousNode = {};
    this.thereIsPath = true;
  }

  testConnection() {
    let result;
    if (!this.nodesExist()) {
      result = `No such nodes in network: ${this.startAddress} ${this.endAddress}`;
    } else if (
      this.isSought(Network.nodeAtExternal(this.network, this.startAddress))
    ) {
      // case when start point is same as endpoint
      // result = this.network.nodeAt(this.startAddress);
      result = Network.nodeAtExternal(this.network, this.startAddress);
    } else {
      result = this.findConnection();
    }
    return result;
  }

  nodesExist() {
    return (
      Network.nodeExistsExternal(this.network, this.startAddress) &&
      Network.nodeExistsExternal(this.network, this.endAddress)
    );
  }

  isSought(node) {
    return node.address === this.endAddress;
  }

  // eslint-disable-next-line consistent-return
  findConnection() {
    this.setStartingNode();
    while (this.thereIsPath) {
      const currentNode = this.goToNextNode();
      if (currentNode == null) {
        return `No connection from ${this.startAddress} to ${this.endAddress}`;
      }
      if (this.isSought(currentNode)) {
        return `Connection from ${this.startAddress} to ${this.endAddress} exists!`;
      }
      this.visitedNodes.push(currentNode.address);
      this.previousNode = currentNode;
    }
  }

  setStartingNode() {
    this.visitedNodes.push(this.startAddress);
    // const startingNode = this.network.nodeAt(this.startAddress);
    const startingNode = Network.nodeAtExternal(
      this.network,
      this.startAddress,
    );
    this.previousNode = startingNode;
  }

  goToNextNode() {
    const paths = this.getUnvisitedPaths();
    if (paths.length === 0) {
      this.thereIsPath = false;
      return null;
    }
    const randomIndex = Math.floor(Math.random() * paths.length);
    // return this.network.nodeAt(paths[randomIndex]);
    return Network.nodeAtExternal(this.network, paths[randomIndex]);
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
    // const avaiablePaths = this.previousNode.getPaths();
    const avaiablePaths = Node.getPathsExternal(this.previousNode);
    return avaiablePaths.filter(
      (path) => this.visitedNodes.indexOf(path) === -1,
    );
  }

  getIndirectPath() {
    return this.visitedNodes.reduce((acc, address) => {
      // const nodePaths = this.network.nodeAt(address).getPaths();
      const nodePaths = Node.getPathsExternal(
        Network.nodeAtExternal(this.network, address),
      );

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
