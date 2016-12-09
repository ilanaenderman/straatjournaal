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
// Goes to profile page of salesman
router.post('/search', (request, response) => {
	db.salesman.findAll({
		where: {id: request.body.ID}
	}).then( profile => {
		response.render('profile', {profile: profile})
	})
})

// AJAX Response when payment is succesfull
router.post('/profile', (request, response) => {
	let number = request.body.number
	let saleAmount = 0.9 * number
	let salesmanId = request.body.salesmanID

	//Create new Sale
	db.sale.create({
		number: number,
		saleAmount: saleAmount,
		salesmanId: salesmanId
	})

	// Find salesman that belongs to the sale
	db.salesman.findOne({
		where: {id: salesmanId},
		attributes: ['id', 'saleAmount', 'income']
	}).then( addInfo => {
		if( addInfo.saleAmount == null) {
			addInfo.saleAmount = 0
		}

		if( addInfo.income == null) {
			addInfo.income = 0
		}

		// Update total sale and income of salesman
		addInfo.update({
			saleAmount: addInfo.saleAmount + Number(number),
			income: addInfo.income + saleAmount
		}).then( addInfo => {
			db.salesman.findAll({
				where: {id: salesmanId}
			}).then( profile => {
				response.render('profile', {message: "Betaling gelukt", profile: profile})
			})
		})	
	})
})

	

module.exports = router