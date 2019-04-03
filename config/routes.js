'use strict';

const ProductRoutes = require('../lib/route/ProductRoutes');
const ShoppingCartRoutes = require('../lib/route/ShoppingCartRoutes');
const routes = [];

module.exports = routes.concat(
    ProductRoutes.getAllProducts,
    ProductRoutes.getById,
    ProductRoutes.search,
    ProductRoutes.getByCategory,
    ProductRoutes.getByDepartment,
    ShoppingCartRoutes.generateUniqueId,
    ShoppingCartRoutes.add
);