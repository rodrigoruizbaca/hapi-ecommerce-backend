const Joi = require('joi');
const Schwifty = require('schwifty');
const shippingRegion = require('./ShippingRegionModel');

module.exports = class CustomerModel extends Schwifty.Model {
    static get tableName() {
        return 'customer';
    }

    static get idColumn() {
        return 'customer_id';
    }

    static get relationMappings() {
        return {
            shipping_region: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: shippingRegion,
                join: {
                    from: 'customer.shipping_region_id',
                    to: 'shipping_region.shipping_region_id'
                }
            }
        }
    }

    static get joiSchema() {
        return Joi.object({
            "customer_id": Joi.object(),
            "name": Joi.string(),
            "email": Joi.string(),
            "password": Joi.string(),
            "address_1": Joi.string(),
            "address_2": Joi.string(),
            "city": Joi.string(),
            "region": Joi.string(),
            "postal_code": Joi.string(),
            "credit_card": Joi.string(),
            "country": Joi.string(),
            "shipping_region_id": Joi.number(),
            "day_phone": Joi.string(),
            "eve_phone": Joi.string(),
            "mob_phone": Joi.string(),
        });
    }

};