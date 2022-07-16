const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const { addArticleValidator } = require('../middleware/validation');

const auth = require('../middleware/auth');  //Cuz only admin allow creating articles

router.post('/',auth('createAny','articles'), addArticleValidator, articlesController.createArticle)

router.route('/article/:id')
.get(auth('readAny','articles'),articlesController.getArticleById)
.patch(auth('updateAny','articles'),articlesController.updateArticleById)
.delete(auth('updateAny','articles'),articlesController.deleteArticleById)


//this is for user who did not sign in as user, cuz they don't hv the auth:
router.route('/users/article/:id')
.get(articlesController.getUsersArticleById)


router.route('/all')
.get(articlesController.getAllArticles)
.post(articlesController.getMoreArticles)

router.post('/admin/paginate',auth('readAny','articles'),articlesController.adminPaginate)


/// Categories
router.route('/categories')
.post(auth('createAny','categories'), articlesController.createCategory)
.get(auth('readAny','categories'),articlesController.getAllCategories)

module.exports = router;