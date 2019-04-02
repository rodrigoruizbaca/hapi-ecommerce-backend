const Joi = require('joi');
const Schwifty = require('schwifty');
const product = require('./ProductModel');

module.exports = class ShoppingCartModel extends Schwifty.Model {
    static get tableName() {
        return 'shopping_cart';
    }

    static get idColumn() {
        return 'item_id';
    }

    static get relationMappings() {
        return {
            product: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: product,
                join: {
                    from: 'shopping_cart.product_id',
                    to: 'product.product_id'
                }
            }
        }
    }

    static get joiSchema() {
        return Joi.object({
            item_id: Joi.number(),
            cart_id: Joi.string(),
            product_id: Joi.number(),
            attributes: Joi.string(),
            quantity: Joi.number(),
            buy_now: Joi.number(),
            added_on: Joi.date()
        });
    }

    async $beforeInsert() {
        const now = new Date();
        this.added_on = now;
    }
}