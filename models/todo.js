const Schema = Mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = Mongoose.model('Todo', todoSchema)