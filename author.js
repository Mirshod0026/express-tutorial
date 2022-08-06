const mongoose = require('mongoose');


const authorSchem = {
    name: String,
    books: [
        {
            type: mongoose.Types.ObjectId,
// bu yerdagi ref ga mongoose.model ichidagi bookning nomi yozilishi kerak
            ref: ''
        }
    ]
}

const authorModel = mongoose.model('Author', authorSchem);

async function createAuthor(name) {
    const author = new authorModel({
        name ,
        books ,
    })

    await author.save();
}

async function getAuthor() {
    const author = await authorModel.find();

    // console.log(author);
}

async function getAuthorById(id) {
    const author = await authorModel.findById(id)

    // console.log(author);

}

async function updateAuthor() {
    // test uchun yozib kordim
}
