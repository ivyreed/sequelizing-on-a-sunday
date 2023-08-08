const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({ include: [Product] })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, { include: [Product] })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // update product data
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));

  // .then((data) => {
  //   if (req.body.tagIds && req.body.tagIds.length) {
  //     ProductTag.findAll({
  //       where: { product_id: req.params.id }
  //     }).then((productTags) => {
  //       // create filtered list of new tag_ids
  //       const productTagIds = productTags.map(({ tag_id }) => tag_id);
  //       const newProductTags = req.body.tagIds
  //         .filter((tag_id) => !productTagIds.includes(tag_id))
  //         .map((tag_id) => {
  //           return {
  //             product_id: req.params.id,
  //             tag_id
  //           };
  //         });

  //       // figure out which ones to remove
  //       const productTagsToRemove = productTags
  //         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  //         .map(({ id }) => id);
  //       // run both actions
  //       return Promise.all([
  //         ProductTag.destroy({
  //           where: {
  //             id: productTagsToRemove
  //           }
  //         }),
  //         ProductTag.bulkCreate(newProductTags)
  //       ]);
  //     });
  //   }

  //   return res.json(product);
  // })
  // .catch((err) => {
  //   // console.log(err);
  //   res.status(400).json(err);
  // });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  // delete a category by its `id` value
});

module.exports = router;
