'use strict';

const random = require('./random');

let carriers = [
  {
    "id": "cfef7469-d973-498e-b6eb-027421a48dd1",
    "attributes": {
      "name": "Ohio Mutual Insurance Company",
      "currentCarrierCode": "OMIC123",
      "deactivatedAt": undefined
    }
  },
  {
    "id": "22d6cfb5-6745-49e1-ac64-d08d22171243",
    "attributes": {
      "name": "Marvel Insurance Company",
      "currentCarrierCode": "MRVL321",
      "deactivatedAt": undefined
    }
  },
  {
    "id": "b3be2390-d925-4855-ab5c-4a9480a08f80",
    "attributes": {
      "name": "Hawkins Regional Insurance",
      "currentCarrierCode": "HAWK4",
      "deactivatedAt": "2000-01-01"
    }
  },
  {
    "id": "74aa7e21-e272-416f-b32a-1502befdd0d1",
    "attributes": {
      "name": "Alf Vision, Inc.",
      "currentCarrierCode": "ALF567",
      "deactivatedAt": undefined
    }
  },
  {
    "id": "aa5d156b-8dd0-4eab-a908-a8e3001302fc",
    "attributes": {
      "name": "Stark Insurance",
      "currentCarrierCode": "STARK5",
      "deactivatedAt": "1975-07-07"
    }
  },
];

const DEFAULTS = [
  {
    "agencyNumber": "A000123",
    "city": "Pekin",
    "state": "IL",
    "county": "Tazewell",
    "zipCode": {
      "baseValue": "12345",
      "extendedValue": "1234",
    },
  },
  {
    "agencyNumber": "A000124",
    "city": "Pekin",
    "state": "IL",
    "county": "Tazewell",
    "zipCode": {
      "baseValue": "12345",
      "extendedValue": "1234",
    },
  }];


function applySort(a, b, order) {
  if (a < b) { return order; }
  if (a > b) { return -order; }
  return 0;
}

function byProperty(f, order) {
  var orderVal;
  if (order === 'desc') {
    orderVal = 1;
  } else {
    orderVal = -1;
  }
  return function (a, b) {
    const valA = f(a);
    const valB = f(b);
    return applySort(valA, valB, orderVal);
  };
}

function isMatch(query, prop) {
  return query !== '' &&
    query !== null &&
    query !== undefined &&
    prop.toLowerCase().indexOf(query.toLowerCase()) !== -1;
}

module.exports = {
  setup: app => {
    app.get('/api/v1/defaults/:agencyNumber', (req, res) => {
      const agencyNumber = req.params.agencyNumber;
      const agencyDefault = DEFAULTS.filter(d => d.agencyNumber === agencyNumber)[0];
      if (agencyDefault) {
        res.status(200).json({
          data: agencyDefault,
        });
      } else {
        res.status(404).json({
          data: {},
        });
      }
    });

    app.put('/api/v1/defaults/:agencyNumber', (req, res) => {
      const agencyNumber = req.params.agencyNumber;
      const agencyDefault = DEFAULTS.filter(d => d.agencyNumber === agencyNumber).map(d => d = req.body)[0];
      if(agencyDefault) {
        const index = DEFAULTS.map(function(e) { return e.agencyNumber; }).indexOf(agencyNumber);
        DEFAULTS[index] = req.body;
        res.status(200).json({
          data: agencyDefault,
        });
      } else {
        const agencyDefaults = req.body;
        DEFAULTS.push(agencyDefaults);
        res.status(201).json({
          data: agencyDefaults,
        })
      }
    });

    app.post('/api/v1/defaults', (req, res) => {
      const agencyDefaults = req.body;
      DEFAULTS.push(agencyDefaults);
      res.status(201).json({
        data: agencyDefaults,
      })
    });
  }
};
