const Joi = require('joi');
const Schwifty = require('schwifty');
const category = require('./CategoryModel');

module.exports = class ProductModel extends Schwifty.Model {
    static get tableName() {
        return 'product';
    }

    static get idColumn() {
        return 'product_id';
    }
    static get joiSchema() {
        return Joi.object({
            product_id: Joi.number(),
            name: Joi.string(),
            description: Joi.string(),
            price: Joi.number(),
            image: Joi.string(),
            image_2: Joi.string(),
            thumbail: Joi.string(),
            display: Joi.number()
        });
    }

    static get relationMappings() {
        return {
            category: {
                relation: Schwifty.Model.ManyToManyRelation,
                modelClass: category,
                join: {
                    from: 'product.product_id',
                    through: {
                        from: 'product_category.product_id',
                        to: 'product_category.category_id'
                    },
                    to: 'category.category_id'
                }
            }
        }
    }
};