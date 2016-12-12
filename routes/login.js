// Login
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// Get 
router.get('/admin', (request, response) => {
	response.render('login')
})

// Post
router.post('/login', (request, response) => {

})

module.exports = router
