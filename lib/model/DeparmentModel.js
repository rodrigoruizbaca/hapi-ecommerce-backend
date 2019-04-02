const Joi = require('joi');
const Schwifty = require('schwifty');

module.exports = class DepartmentModel extends Schwifty.Model {
    static get tableName() {
        return 'department';
    }

    static get joiSchema() {
        return Joi.object({
            department_id: Joi.number(),
            name: Joi.string(),
            description: Joi.string()
        });
    }
};