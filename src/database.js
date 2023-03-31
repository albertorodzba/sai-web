const { connect } = require('mongoose');
const {MONGODB_URI} = require('./config');


(async ()=> {
    try {
       const db = await connect(MONGODB_URI);
       console.log('Database is connected', db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();
