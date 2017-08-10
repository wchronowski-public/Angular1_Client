'use strict'

const UUID = require('node-uuid');

const FLAGS = [
  'Application Accepted',
  'Application Rejected',
];

module.exports = {
  generateUuid: function() {
    return UUID.v4();
  },

  generateNumberBetweenInclusive: function(lo, hi) {
    return Math.floor(Math.random() * (hi - lo + 1) + lo);
  },

  generateBoolean: function() {
    return this.generateNumberBetweenInclusive(0, 1) === 0;
  },

  generateAgencyNumber: function() {
    let number = this.generateNumberBetweenInclusive(1, 2).toString();
    return number;
  },

  generateQuoteNumber: function() {
    let number = this.generateNumberBetweenInclusive(0, 99999999999999).toString();
    for(let i = number.length; i < 14; i++)
      number = '0' + number;
    return number + 'Q';
  },

  generatePolicyNumber: function() {
    let number = this.generateNumberBetweenInclusive(0, 99999999999999).toString();
    for(let i = number.length; i < 14; i++)
      number = '0' + number;
    return 'P' + number;
  },

  generateDate: function() {
    const start = new Date(2016, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  },

  generateFlag: function() {
    return FLAGS[this.generateNumberBetweenInclusive(0, FLAGS.length - 1)];
  },

  generateUploadedState: function() {
    if (this.generateNumberBetweenInclusive(0, 1) === 1) {
      return 'policy';
    } else {
      return 'pending';
    }
  },

  generateVehicleHistoryReportResult: function() {
    const noReport = undefined;

    switch(this.generateNumberBetweenInclusive(0, 9)) {
      case 0:
      case 1:
      case 2:
        return noReport;
      case 3:
        return {
          status: 'failure',
        };
      default:
        return {
          status: 'success',
          attributes: {
            lengthOfOwnershipInDays: this.generateNumberBetweenInclusive(0, 3650),
            averageAnnualMileage: this.generateNumberBetweenInclusive(0, 50000),
            hasFrameDamage: this.generateBoolean(),
            hasTitleProblem: this.generateBoolean(),
          },
        };
    }
  },
}
