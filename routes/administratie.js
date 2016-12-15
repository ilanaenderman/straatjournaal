// Administratie Route
const express 	= require( 'express')
const session 	= require('express-session')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/administratie', (request, response) => {
	let user = request.session.user

	db.user.findOne({
		where: {id: user.id}
	}).then( admin => {
		db.salesman.findAll().then( salesman => {
			response.render('administratie', {salesman: salesman, message: request.query.message})
		})
	})	
})

router.post('/administratie', (request, response) => {
	db.salesman.findAll({
		where: {id: request.body.ID}
	}).then( update => {
		response.render('updateAdmin', {update: update})
	})
})

router.post('/updateAdmin', (request, response) => {
	let name 	= request.body.name
	let age		= request.body.age
	let location= request.body.location
	let bio		= request.body.bio
	let photo 	= request.body.photo
	
	db.salesman.create({
		name: name,
		age: age,
		location: location,
		bio: bio,
		photo: photo,
		saleAmount: 0,
		income: 0
	}).then( newProfile => {
		db.salesman.findAll(
			).then( salesman => {
				response.render('administratie', {salesman: salesman, message: "Nieuw profiel toegevoegd."})
			})
	})
})

router.post('/update', (request, response) => {
	let filter 	   = {}
	let attributes = ['id']
	let ID 		   = request.body.salesmanID

	if(request.body.name) (filter.name = request.body.name) && (attributes.push('name'))
	if(request.body.age) (filter.age = request.body.age) && (attributes.push('age'))
	if(request.body.location) (filter.location = request.body.location) && (attributes.push('location'))
	if(request.body.bio) (filter.bio = request.body.bio) && (attributes.push('bio'))
	if(request.body.photo) (filter.photo = request.body.photo) && (attributes.push('photo'))

	db.salesman.findOne({
		where: {id: ID}, 
		attributes: attributes
	}).then( updateFilter => {
		updateFilter.update(filter
		).then( updateSalesman => {
			db.salesman.findAll({
				where: {id: ID}
			}).then( update => {
				response.render('updateAdmin', {update: update, message: 'Gegevens zijn aangepast'})
			})
		})
	})		
})

router.post('/delete', (request, response) => {
	let ID = request.body.id

	db.salesman.findOne({
		where: {id: ID}
	}).then( deleteProfile => {
		db.salesman.destroy({
			where: {id: ID}
		}).then( deleteProfile => {
			response.redirect('/administratie?message=' + encodeURIComponent('Profiel is verwijderd.'))
		})
	})
})

router.post('/paid', (request, response) => {
	let ID 			= request.body.id

	db.salesman.findOne({
		where: {id: ID},
		attributes: ['id', 'saleAmount', 'income']
	}).then( paid => {
		paid.update({
			saleAmount: 0,
			income: 0
		}).then( paid => {
			db.salesman.findAll({
				where: {id: ID}
			}).then( update => {
				response.render('updateAdmin', {update: update, message2: 'Verkoper is uitbetaald.'})
			})
		})
	})
})

module.exports = router