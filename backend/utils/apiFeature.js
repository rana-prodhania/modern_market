class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // Method for searching based on keyword
  search() {
    if (this.queryStr.keyword) {
      const keywordRegex = new RegExp(this.queryStr.keyword, "i");

      this.query = this.query.find({ name: keywordRegex });
    }
    return this;
  }
}

export default ApiFeature;
