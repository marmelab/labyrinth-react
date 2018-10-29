import mongoose from 'mongoose';

export const initDB = () => {
    setTimeout(() => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://mongodb/games').then(
            () => console.log('Database is connected'),
            err => {
                console.log('Cannot connect to the database\n' + err);
            }
        );
    }, 5000);
};
