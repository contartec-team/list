'use strict'

const chai = require('chai')
const chaiThings = require('chai-things')
const chaiShallowDeepEqual = require('chai-shallow-deep-equal')

chai.use(chaiShallowDeepEqual)
chai.use(chaiThings)
chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))
chai.use(require('chai-datetime'))

global.sinon = require('sinon')

require('sinon-as-promised')

global.expect = chai.expect

process
  .on('uncaughtException', () => {
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1)
    }
  })