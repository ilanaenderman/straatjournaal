// Administratie Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/administratie', (request, response) => {
	db.salesman.findAll().then( salesman => {
		response.render('administratie', {salesman: salesman, message: request.query.message})
	})
})

router.post('/administratie', (request, response) => {
	db.salesman.findAll({
		where: {id: request.body.ID}
	}).then( update => {
		response.render('updateAdmin', {update: update})
	})
})

// router.get('/updateAdmin', (request, response) => {

// })

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
		photo: photo
	}).then( newProfile => {
		db.salesman.findAll(
			).then( salesman => {
				response.render('administratie', {salesman: salesman, message: "Nieuw profiel toegevoegd."})
			})
	})
})


module.exports = router