module.exports = {
    ProductModel: {
        query: (txn) => {
            return {
                findById: (id) => {
                    return {
                        "product_id": 1
                    };
                },
            };
        }
    }
}