const todo = require('../models/todo');
const URL = require('url');

exports.getTodos = async (req, res, next) => {
    try {
        let query = {
            isDeleted: false
        };

        const result = await domain.todo.find(query).sort({ createdAt: 'desc' });

        return res.status(200).json({
            result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.getDeletedTodos = async (req, res, next) => {
    try {
        let query = {
            isDeleted: true
        };

        const result = await domain.todo.find(query).sort({ createdAt: 'desc' });

        return res.status(200).json({
            result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.createNote = async (req, res, next) => {
    try {
        const { title, content, image } = req.body;

        const data = {
            title,
            content,
            image
        }
        const result = await new domain.todo(data).save();

        if (!result) {
            const err = new Error('Something went wrong while creating Note')
            err.statusCode = 422;

            throw err
        }
        return res.status(201).send({
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.updateNote = async (req, res, next) => {
    try {
        const { title, content, image } = req.body;
        const { id } = req.params;

        const data = {
            title,
            content,
            image
        }
        const todoNote = await domain.todo.findOneAndUpdate({ _id: id }, data);

        if (!todoNote) {
            const err = new Error('TODO NOTE not found!')
            err.statusCode = 404;
            throw err
        }

        return res.status(201).send({
            message: "Successfully updated"
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todoNote = await domain.todo.findOne({ _id: id });
        const data = todoNote ? todoNote : { message: "TODO not found!" }

        return res.status(200).send(data)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.searchNotes = async (req, res, next) => {
    try {
        const { search } = req.query;

        const result = await domain.todo.aggregate([
            {
                $match: {
                    $or: [
                        {
                            title: search,
                        }, {
                            content: search,
                        }
                    ]
                }
            }
        ]);

        return res.status(200).json({
            result
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await domain.todo.findOneAndUpdate({ _id: id }, { isDeleted: true });

        if (!result) res.status(304).json({
            message: 'Not deleted!'
        });

        return res.status(200).json({
            result
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}