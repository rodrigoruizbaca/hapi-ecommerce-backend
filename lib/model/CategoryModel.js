const Joi = require('joi');
const Schwifty = require('schwifty');

module.exports = class CategoryModel extends Schwifty.Model {
    static get tableName() {
        return 'category';
    }

    static get joiSchema() {
        return Joi.object({
            category_id: Joi.number(),
            department_id: Joi.number(),
            name: Joi.string(),
            description: Joi.string()
        });
    }
};