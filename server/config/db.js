import mongoose from 'mongoose';

export default () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/meetupME');
    mongoose.connection
        .once('open', () => console.log('MongoDb running!'))
        .on('err', err => console.error(err))
}