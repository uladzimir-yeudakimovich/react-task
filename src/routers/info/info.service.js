const persons = require('../../db/db');

const getData = () => persons.length;

module.exports = { getData };
