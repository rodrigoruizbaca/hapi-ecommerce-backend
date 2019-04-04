const Schmervice = require('schmervice');
const bcrypt = require('bcryptjs');
const { InvalidUsernamePasswordError, DuplicateEntityError } = require('../errors');

module.exports = class CustomerService extends Schmervice.Service {
    async addCustomer(customer, txn) {
        const { CustomerModel } = this.server.models();
        const query = CustomerModel.query(txn);

        const customers = await query.where('email', customer.email);

        if (customers.length != 0) {
            throw new DuplicateEntityError(`Customer with email ${customer.email} already exists`);
        }

        if (!customer.shipping_region_id) {
            customer.shipping_region_id = 1;
        }
        customer.password = await bcrypt.hash(customer.password, 10);
        const savedCustomer = await query.insert(customer);        
        return savedCustomer;
    }

    async getCustomer(email, txn) {
        const { CustomerModel } = this.server.models();
        const query = CustomerModel.query(txn);
        const customers = await query.where('email', email).throwIfNotFound();
        return customers[0];
    }

    async updateCustomer(email, customer, txn) {
        const { CustomerModel } = this.server.models();
        const query = CustomerModel.query(txn);

        if (customer.password) {
            customer.password = await bcrypt.hash(customer.password, 10);
        }
        
        await query.patch(customer).where('email', email);
    }

    async login(email, password, txn) {
        const { CustomerModel } = this.server.models();

        const query = CustomerModel.query(txn);

        const customers = await query.where('email', email);

        const customer = customers[0];

        if (!customer) {
            throw new InvalidUsernamePasswordError('Invalid Username/Password', 401);
        }

        const valid = await bcrypt.compare(password, customer.password);

        if (!valid) {
            throw new InvalidUsernamePasswordError('Invalid Username/Password', 401);
        }

        return customer;
    }
}