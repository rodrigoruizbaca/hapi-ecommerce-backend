const Schmervice = require('schmervice');

module.exports = class ReviewService extends Schmervice.Service {

    async addReview(email, productId, review, txn) {
        const { ReviewModel, CustomerModel } = this.server.models();
        const reviewQuery = ReviewModel.query(txn);
        const customerQuery = CustomerModel.query(txn);
        const customers = await customerQuery.where('email', email);
        const customer = customers[0];
        review.customer_id = customer.customer_id;
        review.product_id = productId;
        return await reviewQuery.insert(review);

    }

    async getReviews(productId, params, txn) {
        const { ReviewModel } = this.server.models();
        const query = ReviewModel.query(txn);

        if (params.pagination) {
            let offset = undefined;
            const limit = params.limit || undefined;

            if (params.page) {
                offset = (parseInt(params.page) -1) * limit;
            }

            const [reviews, total] = await Promise.all([
                query.limit(limit).offset(offset),
                query.resultSize()
            ]);

            return { reviews, total };
        } else {
            const reviews = await query.where('review.product_id', productId);
            return { reviews };
            
        }
      
    }
}