// Function on Search page. Send id salesman to open profile page on button click
$(document).ready( function () {
	$('#button').click( function () {
		var ID =  { 
			input: $("#button").val(),
			name: ID
		}
	})
})

// Function on profile page. AJAX!! Send id salesman when customer buys a newspaper
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

// Function on administratie page. AJAX!! Create new salesman profile
$(document).ready( function () {
	$('#button3').click( function (event) {
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

