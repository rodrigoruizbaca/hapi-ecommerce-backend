const Schmervice = require('schmervice');
module.exports = class ProductService extends Schmervice.Service {
    async getById(id, txn) {
        const { ProductModel } = this.server.models();
        const query = ProductModel.query(txn);
        return await query.throwIfNotFound().findById(id);
    }
    
    async getAll (params, txn) {
        const { ProductModel } = this.server.models();
        const query = ProductModel.query(txn);

        if (params.category_id) {
            query.innerJoinRelation('category').where('category.category_id', params.categoryId);
        } 
        
        if (params.department_id) {
            query.innerJoinRelation('category').where('category.department_id', params.departmentId);
        } 

        if (params.query_string) {
            query.where('product.name', 'like', `%${params.query_string}%`);
        }

        if (params.pagination) {
            let offset = undefined;
            const limit = params.limit || undefined;

            if (params.page) {
                offset = (parseInt(params.page) -1) * limit;
            }

            

            const [products, total] = await Promise.all([
                query.limit(limit).offset(offset),
                query.resultSize()
            ]);

            return { products, total };
        } else {
            const products = await query.orderBy('product.product_id', 'desc');
            return { products };
            
        }
    }
}

