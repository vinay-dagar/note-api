const todoController = require('../controllers/TODO');
const router = require('express').Router();
const { validate } = require('express-validation');

router.get('/notes-list', todoController.getTodos);
router.get('/get-deleted-notes', todoController.getDeletedTodos);
router.get('/get-note/:id', todoController.getById);
router.post('/create-note', todoController.createNote);
// router.post('/create-note', validate(validation.createTodoValidate, {}, {}), todoController.createNote);
router.put('/update-note/:id', todoController.updateNote);
router.get('/search-note', todoController.searchNotes);
router.put('/delete-note/:id', todoController.deleteNote);

module.exports = router