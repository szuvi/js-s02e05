const Node = require('./Node');

class Network {
  constructor() {
    this.nodes = {
      // address: node
    };
  }

  createConnection(source, destination) {
    this.nodes[source] = this.nodes[source] ?? new Node(source);
    this.nodes[destination] = this.nodes[destination] ?? new Node(destination);
    this.nodes[source].addPath(destination);
    this.nodes[destination].addPath(source);
  }

  nodeAt(address) {
    return this.nodes[address];
  }

  static nodeAtExternal(network, address) {
    return network.nodes[address];
  }

  static nodeExistsExternal(network, nodeAddress) {
    return network.nodes[nodeAddress] != null;
  }
}

module.exports = Network;
