const Schmervice = require('schmervice');
const crypto = require("crypto");

module.exports = class ShoppingCartService extends Schmervice.Service {
    generateUniqueId() {
        const id = crypto.randomBytes(16).toString("hex");
        return id;
    }

    async add(cart, txn) {
        const { ShoppingCartModel } = this.server.models();
        const query = ShoppingCartModel.query(txn);
        return await query.insert(cart);
    }
}

