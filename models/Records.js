// models/Record.js
const { Model } = require('objection');
const knex = require('knex')(require('../knexfile').development);

// Give the knex instance to objection.
Model.knex(knex);

class Record extends Model {
  static get tableName() {
    return 'records';
  }

  // Define model schema, relations, etc.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['slug', 'user'],

      properties: {
        id: { type: 'integer' },
        slug: { type: 'string' },
        user: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    };
  }
}

module.exports = Record;
