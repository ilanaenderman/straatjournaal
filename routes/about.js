// About Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/about', (request, response) => {
	response.render('about')
})

module.exports = router