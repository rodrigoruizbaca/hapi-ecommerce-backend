'use strict';

const ProductRoutes = require('../lib/route/product/routes');
const routes = [];

module.exports = routes.concat(
    ProductRoutes.getAllProducts,
    ProductRoutes.getById,
    ProductRoutes.search,
    ProductRoutes.getByCategory,
    ProductRoutes.getByDepartment
);