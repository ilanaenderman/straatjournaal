// Setup Libraries
const sequelize 	= require('sequelize')
const express 		= require('express')
const bodyParser 	= require('body-parser')
const pug			= require('pug')
const pg 			= require('pg')
const bcrypt		= require('bcrypt-node')
const sass			= require('node-sass')
const app			= express()


// Requiring Modules
const db			= require(__dirname + '/models/database.js')


// Setting the pug views
app.set( 'view engine', 'pug')
app.set( 'views', __dirname + '/views' )

app.use( express.static('static'))
app.use( bodyParser.urlencoded({extended: true}))


// Initialize Routes
let homeRoute		= require(__dirname + '/routes/home')
let searchRoute		= require(__dirname + '/routes/search')
let profileRoute	= require(__dirname + '/route/profile')

app.use( homeRoute)
app.use( searchRoute)
app.use( profileRoute)


// Listen port 8000
app.listen(8000, () => {
	console.log('Server is running')
})