// Home Route
const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')

// GET

router.get('/', (request, response) => {
	db.salesman.max('id').then( max => {
		let one		= max
		let two		= max - 1
		let three	= max - 2

		db.salesman.findAll({
			where: { id: one},
			attributes: ['id', 'name', 'location']
		}).then( idOne => {
			db.salesman.findAll({
				where: {id: two},
				attributes: ['id', 'name', 'location']
			}).then( idTwo => {
				db.salesman.findAll({
					where: {id: three},
					attributes: ['id', 'name', 'location']
				}).then( idThree => {
					console.log(idOne)
					console.log(idTwo)
					console.log(idThree)
					response.render('home', {idOne: idOne, idTwo: idTwo, idThree: idThree})
				})
			})
		})
	})
})

module.exports = router
