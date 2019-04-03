const Joi = require('joi');
const Schwifty = require('schwifty');

module.exports = class ShippingRegionModel extends Schwifty.Model {
    static get tableName() {
        return 'shipping_region';
    }

    static get idColumn() {
        return 'shipping_region_id';
    }

    static get joiSchema() {
        return Joi.object({
            shipping_region_id: Joi.number(),
            shipping_region: Joi.string()
        });
    }
}