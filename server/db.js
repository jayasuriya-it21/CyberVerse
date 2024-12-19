const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log("Connected to MongoDB...");

        const db = mongoose.connection;
        const collections = await db.db.listCollections({ name: 'users' }).toArray();
        if (collections.length === 0) {
            await db.createCollection('users');
            console.log("Created 'users' collection...");
        }

        const quizResultCollections = await db.db.listCollections({ name: 'quizResults' }).toArray();
        if (quizResultCollections.length === 0) {
            await db.createCollection('quizResults');
            console.log("Created 'quizResults' collection...");
        }


        // const quizCollections = await db.db.listCollections({ name: 'quizzes' }).toArray();
        // if (quizCollections.length === 0) {
        //     await db.createCollection('quizzes');
        //     console.log("Created 'quizzes' collection...");
        // }

        // const quiz1Collections = await db.db.listCollections({ name: 'quiz1' }).toArray();
        // if (quiz1Collections.length === 0) {
        //     await db.createCollection('quiz1');
        //     console.log("Created 'quiz1' collection...");
        // }

    } catch (error) {
        console.error("Could not connect to MongoDB...", error);
    }
}

module.exports = connectToDatabase;
