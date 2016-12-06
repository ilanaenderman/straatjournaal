// Profile Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/profile', (request, response) => {
	response.render('profile')
})

module.exports = router