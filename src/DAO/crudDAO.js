class CrudDAO {

  constructor(model, key) {
    this.model = model;
  }

  all() {
    return this.model.find();
  }

  get(item) {
    return this.model.findOne(item);
  }

  post(item) {
    return this.model.create(item);
  }

  list(query, pagination = { ignore: 0 , limit: 10}) {
    return this.model
      .find(query)
      .skip(pagination.ignore)
      .limit(pagination.limit)
  }

  delete(criteria, item) {
    return this.model.deleteOne(criteria, item);
  }

  push(id, item) {
    return  this.model.updateOne(id, { $push: item })
  }

  pull(id, item) {
    return this.model.updateOne({ _id: id }, { $pull: { item }});
  }

  update(id, item) {
    return this.model.updateOne({ _id: id }, { $set: item });
  }
}

module.exports = CrudDAO;
