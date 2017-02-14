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
	lastName: sequelize.STRING, 
	bio: sequelize.TEXT,
	age: sequelize.INTEGER,
	location: sequelize.STRING,
	photo: sequelize.STRING,
	saleAmount: sequelize.INTEGER,
	income: sequelize.FLOAT
})

db.sale = db.conn.define('sale', {
	amount: sequelize.INTEGER,
	number: sequelize.INTEGER
})

db.user = db.conn.define('user', {
	email: sequelize.STRING,
	password: sequelize.STRING
})


// Define relationships
db.salesman.hasMany(db.sale)
db.sale.belongsTo(db.salesman)

// Create test user
db.conn.sync({force: true}).then( database => {
	bcrypt.hash('password', null, null, (err, hash) => {
		db.salesman.create({
			name: 'Ans',
			lastName: 'Janssen',
			bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			age: 36,
			location: 'Haarlem',
			photo: 'images/image_4.jpg',
			saleAmount: 0,
			income: 0
		})
		db.salesman.create({
			name: 'Bert',
			lastName: "de Boer",
			bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			age: 65,
			location: 'Amsterdam',
			photo: 'images/image_5.jpg',
			saleAmount: 0,
			income: 0
		})
		db.salesman.create({
			name: 'Cees',
			lastName: 'Paap',
			bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			age: 26,
			location: 'Breda',
			photo: 'images/image_6.jpg',
			saleAmount: 0,
			income: 0
		})
		db.salesman.create({
			name: 'Daan',
			lastName: 'Smit',
			bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			age: 44,
			location: 'Amsterdam',
			photo: 'images/image_5.jpg',
			saleAmount: 0,
			income: 0
		})
		db.salesman.create({
			name: 'Evelien',
			lastName: 'Koper',
			bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			age: 70,
			location: 'Zandvoort',
			photo: 'images/image_6.jpg',
			saleAmount: 0,
			income: 0
		})
		db.user.create({
			email: 'admin@admin.com',
			password: hash
		})
	})
})

// Export
module.exports = db
