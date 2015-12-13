#!/usr/bin/env node

var shelljs = require('shelljs');
var path = require('path');
var fs = require('fs');
var colors = require('colors');
var utils = require('../Utils/utils');

function help() {
	console.log('use: copyFileTo -p [Path to file list] -c [Path to config file] -n [Number of lines to process] -test [true|false] -verbose [true|false] -cmp [true|false]');
	console.log('ej: copyFileTo -p music4Phone.txt -c config/phone.json -n 10');
	process.exit(0);
}

function processArgs(){
	var args = {};

	args.pathToListFile = utils.args.getParam('-p', {helpCallBack: help, mandatory: true});
	args.pathToConfigFile = utils.args.getParam('-c', {helpCallBack: help, mandatory: true});
	args.blockSize = utils.args.getParam('-n', {helpCallBack: help, defaultValue: 0});
	args.test = ( utils.args.getParam('-test', {helpCallBack: help, defaultValue: 'true'}) == 'true' );
	args.verbose = ( utils.args.getParam('-verbose', {helpCallBack: help, defaultValue: 'false'}) == 'true' );
	args.cmp = ( utils.args.getParam('-cmp', {helpCallBack: help, defaultValue: 'false'}) == 'true' );

	return args;
}

function processListFileByBlocks(listFile, blockSize, pathToConfigFile) {
	var blockToProcess = listFile.splice(0, blockSize);
	var pathToNewConfigFile = pathToConfigFile.substr(0, pathToConfigFile.lastIndexOf(path.sep)+1) + 'listFileToProcessNext.txt';
	fs.writeFileSync(pathToNewConfigFile, listFile.join('\n'), 'utf8');
	utils.popup.alert('A new file created "' + pathToNewConfigFile + '" to be processed the next time');

	return blockToProcess;
}


function backupListFile(listFile, pathToConfigFile) {
	var pathToNewConfigFile = pathToConfigFile.substr(0, pathToConfigFile.lastIndexOf(path.sep)+1) + 'listFileToProcessNext.txt';
	fs.writeFileSync(pathToNewConfigFile, listFile.join('\n'), 'utf8');
	utils.popup.alert('A new backup fileList created "' + pathToNewConfigFile + '" to be processed the next time');
}


function processHandler() {
	var args = processArgs();
	var configFile = require(args.pathToConfigFile);

	if (args.test === true) {
		utils.popup.alert('MODE TEST ACTIVATED', 'blue');
	}

	if (args.verbose === true){
		console.log(JSON.stringify(args, null, 4));
	}

	if (args.cmp === true) {
		cmp(args, configFile);
	} else {
		copy(args, configFile);
	}
}

function cmp(args, configFile) {
	var listFile = fs.readFileSync(args.pathToListFile, 'utf8').split('\n');
	var cmd = 'ls -1 ' + configFile.target;
	//	console.log(cmd);
	var output = shelljs.exec(cmd, {silent: true});
	if (output.code !== 1){
		var fisicalList = output.output.split('\n');
		var teoricalList = {};
		for (var i = 0; i < listFile.length; i++) {
			var line = listFile[i].split(';');
			if (line[1] !== undefined) {
				teoricalList[ line[1].trim() ] = { path: line[0] };
			}
		}
		fisicalList.sort();
		//		teoricalList.sort();
		//		console.log(fisicalList);
		//		console.log(teoricalList);
		var diffList = [];
		for (var i in teoricalList) {
			if ( fisicalList.indexOf( i ) === -1 ) {
				console.log('NO ESTA: ' + i);
				diffList.push( teoricalList[i].path + ';' + i);
			}
		}
		if (diffList.length > 0) {
			var pathToNewConfigFile = args.pathToConfigFile.substr(0, args.pathToConfigFile.lastIndexOf(path.sep)+1) + 'diffList.txt';
			fs.writeFileSync(pathToNewConfigFile, diffList.join('\n'), 'utf8');
		}
	} else {
		console.error('Something went wrong when listing target');
	}
}


function e0(path) {
	var res = path;
	res = res.replace(/'/g, '\'"\'"\'');
	return res;
}

function e1(path) {
	var res = path;
	res = res.replace(/'/g, '');
	return res;
}

function copy(args, configFile){
	var listFile = fs.readFileSync(args.pathToListFile, 'utf8').split('\n');
	var blockSize = (args.blockSize === 0) ? listFile.length : args.blockSize;
	if (blockSize > 0) {
		var backup = listFile.slice(0);
		listFile = processListFileByBlocks(listFile, blockSize, args.pathToConfigFile);
	}
	for(var i = 0; i < blockSize; i++) {
		var originPath = listFile[i].split(';')[0];
		var targetFileName = listFile[i].split(';')[1];
		var cmd = configFile.command + " '" + e0(originPath) + "' '" + configFile.target + e1(targetFileName) + "'";
		cmd = cmd.replace(/\n/g, '');
		if (args.test === false) {
			var log = shelljs.exec(cmd);
			if (args.verbose === true) {
				console.log('CMD $> ' + cmd);
			}
			if (log.code !== 0) {
				console.error('[ERROR COPYING]  ' + listFile[i]);
				console.log(log);
				backupListFile( (backup) ? backup:listFile, args.pathToConfigFile);
				process.exit(1);
			}
		} else {
			console.log('CMD $> ' + cmd);
		}
	}
}


/*
* MAIN PROCESSS
*/

processHandler();
