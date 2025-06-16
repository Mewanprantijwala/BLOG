const { creation, viewing, singleViewing, deletion, updation, multiImageCreation } = require('../controller/blog.controller');
const router = require('express').Router();
const upload = require('../upload');

router.post('/', upload.single('blog_img'), creation);
router.get('/', viewing);
router.get('/:id', singleViewing);
router.delete('/:id', deletion);
router.put('/:id', upload.single('blog_img'), updation);

module.exports = router;
