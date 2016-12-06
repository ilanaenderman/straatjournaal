// Search Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/search', (request, response) => {
	response.render('search')
})

module.exports = router