'use strict';

const { ProductRoutes, ShoppingCartRoutes, CustomerRoutes } = require('../lib/route');

const routes = [];

module.exports = routes.concat(
    ProductRoutes.getAllProducts,
    ProductRoutes.getById,
    ProductRoutes.search,
    ProductRoutes.getByCategory,
    ProductRoutes.getByDepartment,
    ProductRoutes.getAllReviews,
    ProductRoutes.addReview,
    ShoppingCartRoutes.generateUniqueId,
    ShoppingCartRoutes.add,
    CustomerRoutes.add,
    CustomerRoutes.login,
    CustomerRoutes.update,
    CustomerRoutes.get,
    CustomerRoutes.updateAddress,
    CustomerRoutes.updateCreditCard
);