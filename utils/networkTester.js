const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');
const { Observable } = require('rxjs');
const Crawler = require('../classes/Crawler');

if (isMainThread) {
  module.exports = function testConnection$(network, start, end) {
    return new Observable((subscriber) => {
      const worker = new Worker(__filename, {
        workerData: {
          network,
          start,
          end,
        },
      });
      worker.on('message', (data) => subscriber.next(data));
      worker.on('exit', () => subscriber.complete());
    });
  };
} else {
  const workingCrawler = new Crawler(
    workerData.network,
    workerData.start,
    workerData.end,
  );
  parentPort.postMessage(workingCrawler.testConnection());
}
