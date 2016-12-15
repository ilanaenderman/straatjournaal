// Search Route
const express 	= require( 'express')
const session 	= require('express-session')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/search', (request, response) => {
	db.salesman.findAll().then( salesman => {
		response.render('search', {salesman: salesman, admin: request.session.user})
	})
})
// Goes to profile page of salesman
router.post('/search', (request, response) => {
	db.salesman.findAll({
		where: {id: request.body.ID}
	}).then( profile => {
		response.render('profile', {profile: profile, admin: request.session.user})
	})
})


// // AJAX when search field is blank
// router.post('/searchTotal', (request, response) => {
// 	db.salesman.findAll().then( salesman => {
// 		response.render('search', {salesman: salesman, admin: request.session.user})
// 	})
// })

// AJAX Response when payment is succesfull
router.post('/profile', (request, response) => {
	let number 		= request.body.number
	let saleAmount 	= 0.9 * number
	let salesmanId 	= request.body.salesmanID
	let amount 		= 2.29 * number
	console.log(amount)

	// let payment = {
	// 	amount: amount,
	// 	description: "Straatjournaal"
	// 	redirectUrl: redirectUrl,
	// 	method: 'ideal'
	// }



	// mollie.payments.create(payment, payment => {
	// 	if(payment.isPaid()) {
	// 		console.log(error) {
	// 			response.render('profile', {message: payment.error})
	// 		} else {
	// 			console.log(payment)
	// 		}
	// 	}
	// })

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
				response.render('profile', {message: "Betaling gelukt", profile: profile, admin: request.session.user})
			})
		})	
	})
})

	

module.exports = router