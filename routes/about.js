// About Route
const express 	= require('express')
const session 	= require('express-session')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')


// GET
router.get('/about', (request, response) => {
	response.render('about', {admin: request.session.user})
})

module.exports = router