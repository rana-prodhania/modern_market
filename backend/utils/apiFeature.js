class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // Method for searching based on keyword
  search() {
    const { keyword } = this.queryStr;
    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");
      this.query = this.query.find({ name: keywordRegex });
    }
    return this;
  }

  // Method for filtering based on category and price
  filter() {
    const { keyword, page, limit, price, ...filterParams } = this.queryStr;
    this.query = this.query.find(filterParams);

    // Filter by price
    if (price) {
      const [minPrice, maxPrice] = price.split("-").map(Number);
      if (minPrice && maxPrice) {
        this.query = this.query.find({
          price: { $gte: minPrice, $lte: maxPrice },
        });
      }
    }

    return this;
  }

  // Method for result per page
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.skip(skip).limit(resultPerPage);
    return this;
  }
}

export default ApiFeature;
