#!/usr/bin/env node
/**
 * Concurrently curl a list of hosts and print the results
 */

var yatf = require('yatf');
var http = require('http');
var request = require('request');
var urls = process.argv.slice(2);
var timeout = 10 * 1000;
var headers = ['URL', 'CODE', 'BODY'];
var data = [];

if (urls[0] === '-h' || urls[0] === '--help')
  return console.log('Usage: pcurl url1 url2 url3 ...\nUsage: cat urls.txt | pcurl');

// make an async request for all URLs
function process_urls(urls) {
  // Loop the urls array and make async requests
  urls.forEach(function(url) {
    request({url: url, timeout: timeout}, function(err, res, body) {
      var ret = [];
      ret.push(url);

      // Check for errors with the request
      if (err) {
        ret.push('');
        ret.push(err.message.red);
        return data.push(ret);
      }

      // Response code
      if (res.statusCode === 200)
        ret.push(('' + res.statusCode).green);
      else
        ret.push(('' + res.statusCode).red);

      // Body
      ret.push(body && body.trim() || '');

      data.push(ret);
    });
  });
}

// report on exit
process.on('exit', function() {
  yatf(headers, data.sort(), {underlineHeaders: true});
});

if (urls.length) return process_urls(urls);

// if we are here, no URLs were given, wait for stdin
var body = '';
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(chunk) {
  body += chunk;
});
process.stdin.on('end', function() {
  urls = body.trim().split('\n');
  process_urls(urls);
});
