// Search Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/search', (request, response) => {
	db.salesman.findAll().then( salesman => {
		response.render('search', {salesman: salesman})
	})
})

router.post('/search', (request, response) => {
	db.salesman.findAll({
		where: {id: request.body.ID}
	}).then( profile => {
		response.render('profile', {profile: profile})
	})
})


router.post('/profile', (request, response) => {
	let number = request.body.number
	let amount = 2
	let salesmanId = request.body.salesmanID

	db.sale.create({
		number: number,
		amount: amount,
		salesmanId: salesmanId
	}).then( sold => {
		db.salesman.findAll({
			where: {id: salesmanId}
		}).then( profile => {
			response.render('profile', {message: "Betaling gelukt", profile: profile})
		})
	})
})

module.exports = router