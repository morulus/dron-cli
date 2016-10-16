#! /usr/bin/env node
// -*- js -*-
"use strict";

var Dron = require('dron/Dron');//require('./../dron/Dron');////;
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2));
var cli = new Dron(process, argv);
//console.log(chalk.blue('Executes'),chalk.blue.bold(process.argv[2]), chalk.blue('dron'));
cli.usePackage(process.argv[2], argv)
.then(function(result) {
	console.log(result ? chalk.green('OK') : chalk.red('Mission aborted', result));
})
.catch(function(e) {
	if (argv['show-errors']) {
		console.log(chalk.red('Package '+process.argv[2]+' has an errors'), e.message, e.stack);
		throw e;
	} else {
		console.log(chalk.red('Package '+process.argv[2]+' has an errors. Run `dron debug '+process.argv[2]+'` to find a problem.'));
	}
});
