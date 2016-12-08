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
db.salesman = db.conn.define('salesman', {
	name: sequelize.STRING, 
	bio: sequelize.TEXT,
	age: sequelize.INTEGER,
	location: sequelize.STRING,
	photo: sequelize.STRING,
	saleAmount: sequelize.INTEGER,
	income: sequelize.INTEGER
})

db.sale = db.conn.define('sale', {
	amount: sequelize.INTEGER,
	number: sequelize.INTEGER
})


// Define relationships
db.salesman.hasMany(db.sale)
db.sale.belongsTo(db.salesman)

// Create test user
db.conn.sync({force: true}).then( database => {
	db.salesman.create({
		name: 'Ilana Enderman',
		bio: 'blaaa blaabla bla blaaaaaa bla bla bllaaaa blaa',
		age: 27,
		location: 'Haarlem'
	})
	db.salesman.create({
		name: 'Laura Kramer',
		bio: 'blaaa blaabla bla blaaaaaa bla bla bllaaaa blaa',
		age: 26,
		location: 'Voorschoten'
	})
})

// Export
module.exports = db
