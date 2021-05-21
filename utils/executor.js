const { Observable } = require('rxjs');
const testConnection$ = require('./networkTester');

function interpret$(action, network) {
  switch (action.type) {
    case 'B': {
      return new Observable((subscriber) => {
        network.createConnection(action.start, action.end);
        subscriber.next(
          `Connection created from ${action.start} to ${action.end}`,
        );
      });
    }
    case 'T': {
      return testConnection$(network, action.start, action.end);
    }
    default: {
      throw new Error('Incorrect action type');
    }
  }
}

module.exports = interpret$;
