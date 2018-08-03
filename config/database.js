// config/database.js
// mlab.com
module.exports = {
    'port': process.env.PORT || 3000,
    'url': process.env.MONGOLAB_URI,
    'localhost': 'mongodb://localhost/CRUD-hockey-table'
};