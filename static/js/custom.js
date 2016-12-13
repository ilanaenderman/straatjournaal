// Send id salesman to open profile page on button click
$(document).ready( function () {
	$('#button').click( function () {
		var ID =  { 
			input: $("#button").val(),
			name: ID
		}
	})
})

// AJAX!! Send id salesman when customer buys a newspaper
$(document).ready(function() {
    $('#button2').submit(function(event) {
		event.preventDefault()
		var profile = {
			number: 	$("#number").val(),
			salesmanID: $("#salesmanID").val(),
		}
    	$.post("/profile", profile, function(response) {
        	$("#message").html(response.message)
    	})
	})
})

// AJAX!! Create new salesman profile
$(document).ready( function () {
	$('#button3').click( function () {
		event.preventDefault()
		var ID =  { 
			input: 		$("#button3").val(),
			name: 		$("#name").val(),
			age: 		$("#age").val(),
			location: 	$("#location").val(),
			bio: 		$("#bio").val(),
			photo: 		$("#photo").val()
		}
		$.post("/updateAdmin", ID, function(response) {
			$("#message").html(response.message)
		})
	})
})


// AJAX! Search
// $(document).ready( function () {
// 	$("#search").keyup( () => {
// 		if( timer() ){

// 		var letter = { 
// 			input: $("#search").val()
// 		}
// 		if( $('#search').val() == "" ){
// 			$.post("/searchTotal", letter, (response) => {
// 			$("#message").append(response.salesman)
// 			})
// 		}
// 		else {
// 			$.post("/searchAutocomplete", letter, (response) => {
// 				$('#result').html("")
// 				for( var i = 0; i < response.data.length; i++) {
// 					$("#result").append(response.data[i].firstName + " " + response.data[i].lastName + ": " + response.data[i].email + "<br>")
// 				}
// 			})
// 		}
// 	} else {console.log("false")}
// 	})
// })


// //bandwidth optimalization
// var oldTime = 0
// function timer() {
// 	var newTime = Date.now()
// 	var interval= newTime - oldTime
// 	if(interval > 300){
// 		oldTime = newTime
// 		console.log("true")
// 		return true
// 	} 
// 	else {
// 		oldTime = newTime
// 		console.log("false")
// 		return false

// 	}
// }
