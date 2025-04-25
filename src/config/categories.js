const allCategories = {
  categories: ['wedding', 'birthday', 'corporate', 'get-together'],
};

const categories = Object.keys(allCategories);
const categoryRights = new Map(Object.entries(allCategories));

module.exports = {
  categories,
  categoryRights,
};
