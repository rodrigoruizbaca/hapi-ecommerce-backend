const Joi = require('joi');
const Schwifty = require('schwifty');

module.exports = class ReviewModel extends Schwifty.Model {
    static get tableName() {
        return 'review';
    }

    static get idColumn() {
        return 'review_id';
    }

    static get joiSchema() {
        return Joi.object({
            review_id: Joi.number(),
            customer_id: Joi.number(),
            product_id: Joi.number(),
            review: Joi.string(),
            rating: Joi.number(),
            created_on: Joi.date()
        });
    }

    static get relationMappings() {
        return {
            customer: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./index').CustomerModel,
                join: {
                    from: 'review.customer_id',
                    to: 'customer.customer_id'
                }
            },
            product: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./index').ProductModel,
                join: {
                    from: 'review.product_id',
                    to: 'product.product_id'
                }
            }
        }
    }

    async $beforeInsert() {
        const now = new Date();
        this.created_on = now;
    }
};