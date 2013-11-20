var logger = require('../src/lib/logger.js'),
    assert = require('assert');

describe('logger', function() {

  it('log shoud set transports', function() {
    assert(logger.transports.console);
    assert(logger.transports.file); 
  });

  it('should set consolse attributes', function() {
    assert.equal(false, logger.transports.console.json);
    assert.equal(true, logger.transports.console.timestamp);
    assert.equal(true, logger.transports.console.colorize);
  });

  it('should set file attributes', function() {
    assert.equal(false, logger.transports.file.json);
    assert.equal(true, logger.transports.file.timestamp);
    assert.equal('rss.log', logger.transports.file.filename);
    assert.equal(1000000, logger.transports.file.maxsize);
    assert.equal(1, logger.transports.file.maxFiles);
  });

  it('should not exit on failure', function() {
    assert.equal(false, logger.exitOnError);
  });

  it('should set consolse exception handler attributes', function() {
    assert.equal(false, logger.exceptionHandlers.console.json);
    assert.equal(true, logger.exceptionHandlers.console.timestamp);
    assert.equal(true, logger.exceptionHandlers.console.colorize);
  });

  it('should set file exception handler attributes', function() {
    assert.equal(false, logger.exceptionHandlers.file.json);
    assert.equal(true, logger.exceptionHandlers.file.timestamp);
    assert.equal('exceptions.log', logger.exceptionHandlers.file.filename);
    assert.equal(1000000, logger.exceptionHandlers.file.maxsize);
    assert.equal(1, logger.exceptionHandlers.file.maxFiles);
  });

});
