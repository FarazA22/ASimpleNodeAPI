const mongoose = require('mongoose');

module.exports = {
  mongoose,
  connect: async () => {
    mongoose.Promise = Promise;
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'StrategicFSTest',
    });
  },
  disconnect: async (done) => {
    await mongoose.disconnect(done);
  },
};
