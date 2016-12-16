// Search Route
const express 	= require( 'express')
const session 	= require('express-session')
const Mollie 	= require('mollie-api-node')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

let mollie 	= new Mollie.API.Client
mollie.setApiKey("test_ekKwfJhjFmhHaM3rs8BCjuadJpz6h3")
	


// GET
router.get('/search', (request, response) => {
	db.salesman.findAll().then( salesman => {
		response.render('search', {salesman: salesman, admin: request.session.user})
	})
})
// Go to profile page of salesman
router.post('/search', (request, response) => {
	db.salesman.findAll({
		where: {id: request.body.ID}
	}).then( profile => {
		response.render('profile', {profile: profile, admin: request.session.user})
	})
})

// AJAX Response when payment is succesfull
router.post('/profile', (request, response) => {
	let number 		= request.body.number
	let saleAmount 	= 0.9 * number
	let salesmanId 	= request.body.salesmanID
	let amount 		= 2.29 * number
	// let redirectUrl = "http://localhost:8000/profile"

	// let payment = {
	// 	amount: amount,
	// 	description: "Straatjournaal krant",
	// 	redirectUrl: redirectUrl,
	// 	method: 'ideal'
	// }

	// // Create Mollie payment
	// mollie.payments.create(payment, payment => {
	// 	if(payment.error) {
	// 		console.log(payment.error)
	// 		response.render('profile', {message: payment.error})
	// 	} else {
	// 		console.log(payment)
	// 		response.render('profile', {payment: payment})
	// 	}
	// })

	// // Retrieve payment
	// mollie.payment.get(payment.id, payment => {
	// 	if(payment.isPaid())
	// 		console.log("Payment recieved")
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