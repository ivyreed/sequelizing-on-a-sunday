const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: [Product] })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, { include: [Product] })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // update product data
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  // .then((product) => {
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
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
