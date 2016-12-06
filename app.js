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
const db			= require(__dirname + '/modules/database.js')


// Setting the pug views
app.set( 'view engine', 'pug')
app.set( 'views', __dirname + '/views' )

app.use( express.static('static'))
app.use( bodyParser.urlencoded({extended: true}))


// Initialize Routes
let homeRoute		= require(__dirname + '/routes/home')
let searchRoute		= require(__dirname + '/routes/search')
let contactRoute	= require(__dirname + '/routes/contact')
let aboutRoute		= require(__dirname + '/routes/about')
let profileRoute	= require(__dirname + '/routes/profile')
let adminRoute		= require(__dirname + '/routes/administratie')

app.use( homeRoute)
app.use( searchRoute)
app.use( contactRoute)
app.use( aboutRoute)
app.use( profileRoute)
app.use( adminRoute)


// Listen port 8000
app.listen(8000, () => {
	console.log('Server is running')
})