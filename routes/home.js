// Home Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/', (request, response) => {
	response.render('home')
})

module.exports = router
