// You have been giving a task of building and
//  testing a network. You are receiving commands
//  and should execute them in order they have
//  been send. The commands are made from three
//  elements. Operation B – build connection, T –
//  test if connection exists and give information
//  as true or false. The two last elements are
//  two IP addresses. Start IP and end IP.
const { from } = require('rxjs');
const { map, mergeAll } = require('rxjs/operators');
const rawInput = require('./resources/input.json');
const parse = require('./utils/parser');
const execute$ = require('./utils/executor');
const Network = require('./classes/Network');

const loggingObserver = {
  next: (data) => console.log(data),
  error: (err) => console.error(err),
};

const myNetwork = new Network();

from(rawInput)
  .pipe(
    map((command) => parse(command)),
    map((instruction) => execute$(instruction, myNetwork)),
    mergeAll(),
  )
  .subscribe(loggingObserver);
