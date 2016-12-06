// Contact Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/contact', (request, response) => {
	response.render('contact')
})

module.exports = router