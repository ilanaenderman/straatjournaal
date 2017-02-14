// Home Route
const express 	= require( 'express');
const session 	= require('express-session');
const router	= express.Router( );
const db		= require(__dirname + '/../modules/database');


// GET Show three newest salesman
router.get('/', (request, response) => {
	db.salesman.max('id').then( max => {
		let one		= max
		let two		= max - 1
		let three	= max - 2

		db.salesman.findAll({
			where: { id: one},
			attributes: ['id', 'name', 'lastName', 'location', 'photo']
		}).then( idOne => {
			db.salesman.findAll({
				where: {id: two},
				attributes: ['id', 'name', 'lastName', 'location', 'photo']
			}).then( idTwo => {
				db.salesman.findAll({
					where: {id: three},
					attributes: ['id', 'name', 'lastName', 'location', 'photo']
				}).then( idThree => {
					console.log(idOne);
					console.log(idTwo);
					console.log(idThree);
					response.render('home', {idOne: idOne, idTwo: idTwo, idThree: idThree, admin: request.session.user});
				})
			})
		})
	})
})


// POST Go to profile
router.post('/', (request, response) => {
	db.salesman.findAll({
		where: {id: request.body.ID}
	}).then( profile => {
		response.render('profile', {profile: profile});
	})
})

module.exports = router;
