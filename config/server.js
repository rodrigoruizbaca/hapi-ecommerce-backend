'use strict';

// Dependencies
const Hapi = require('hapi');
const Inert = require('inert');
const parameters = require('./config');
const routes = require('./routes');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const Vision = require('vision');
const Schmervice = require('schmervice');
const Schwifty = require('schwifty');

//Services
const ProductService = require('../lib/service/ProductService');
const ShoppingCartService = require('../lib/service/ShoppingCartService');

//Models
const ProductModel = require('../lib/model/ProductModel');
const ShoppingCartModel = require('../lib/model/ShoppingCartModel');

const server = new Hapi.Server({
	host: parameters.server.host,
    port: parameters.server.port
});

const swaggerOptions = {
    info: {
        title: 'Test API Documentation',
        version: Pack.version,
    },
};

const paginationOpts = {
    routes: {
        include: ['/product', '/product/search'],
        exclude: ['/documentation', '/shoppingcart​']
    }
};

const schwiftyOpts = {
    knex: {
        client: 'mysql2',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'root',
            database : 'store',
            port: 3308
        }
    }
};

server.route(routes);

module.exports.init = async () => {
	await server.initialize();
    return server;
};

module.exports.start = async () => {
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.register({
        plugin: Schwifty,
        options: schwiftyOpts
    });
    await server.register(
        {
            "plugin": require('hapi-pagination'),
            "options": paginationOpts
        }
    );
    await server.register(Schmervice);

    server.registerService(ProductService);
    server.registerService(ShoppingCartService);

    server.schwifty(ProductModel);
    server.schwifty(ShoppingCartModel);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};
