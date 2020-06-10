const Schema = Mongoose.Schema;

const tileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = Mongoose.model('Tile', tileSchema)