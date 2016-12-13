// Contact Route
const express 	= require( 'express')
const session 	= require('express-session')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/contact', (request, response) => {
	response.render('contact', {admin: request.session.user})
})

module.exports = router