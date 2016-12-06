// Administratie Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/administratie', (request, response) => {
	response.render('administratie', {message: request.query.message})
})

router.post('/administratie', (request, response) => {
	let name 	= request.body.name
	let age		= request.body.age
	let location= request.body.location
	let bio		= request.body.bio
	console.log(name + " " + age + " " + location + " " + bio)

	db.salesman.create({
		name: name,
		age: age,
		location: location,
		bio: bio
	}).then( newProfile => {
		response.redirect('/administratie?message=' + encodeURIComponent("Geslaagd"))
	})
})

module.exports = router