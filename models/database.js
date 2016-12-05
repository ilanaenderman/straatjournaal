// DB Object
const db = { }


// Setup SQL
const sequelize = require( 'sequelize' )
const bcrypt 	= require('bcrypt-node')

db.conn = new sequelize('straatjournaal', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})


// Models
db.seller = db.conn.define('seller', {
	fullName: sequelize.STRING, 
	bio: sequelize.STRING,
	age: sequelize.INTEGER,
})

db.sale = db.conn.define('sale', {
	amount: sequelize.FLOAT,
	date: sequelize.DATE,
	time: sequelize.TIME,
	location: sequelize.STRING
})


// Define relationships
db.seller.hasMany(db.sale)
db.sale.belongsTo(db.seller)

// Create test user
db.conn.sync({force: true}).then( database => {
	db.seller.create({
		fullName: "Jane Doe",
		bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		age: 40,
	})
})

// Export
module.exports = db
