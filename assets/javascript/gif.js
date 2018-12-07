// Setting API key as a variable
var api_key = 'uviUHQfr8LQxpWLAQ8TU6rmPV1lY53Ra';
// Declaring variables for each button
var topics = ["Batman", "Superman", "Aquaman", "Green Lantern", "Green Arrow", "The Flash", "Wonder Woman",
    "Deadpool", "Spiderman", "Iron Man", "Thor", "Captain America"];
// Variable for user input
var input;
// Initializing the document
$(document).ready(function () {
    // For loop to dynamicly convert our topics array into buttons
    for (var i = 0; i < topics.length; i++) {
        var buttons = $('<button>' + topics[i] + '</button>')
        buttons.appendTo('#topics');

    }
    $('#topics').on('click', 'button', function(){
        var topics = $(this).text().trim();
        ajaxcall(topics);
        $("#giphys").empty();
    }) 

    


    // Telling the giphy API what keywords to search for
    var searchString = "superHeros";
    // Making the search form input user data
    $('#search').on('click', function (event) {
        event.preventDefault();
        input = $('#input').val().trim();
        var checkArray = [];
        for(var i = 0; i < topics.length; i++) {
            checkArray.push( topics[i].toLowerCase() );
            console.log(checkArray)
        }
        if( !checkArray.includes(input.toLowerCase()) ) {
            topics.push(input);
        }
        renderButtons();
        ajaxcall(input);
        $("#input").val("");
    });

    function renderButtons() {
        $("#topics").empty();
        for (var i = 0; i < topics.length; i++) {
            var buttons = $('<button>' + topics[i] + '</button>')
            buttons.appendTo('#topics');
        }
    }

    // Render buttons function
    renderButtons();
    //end point + 
    //operation    search?q= somestring
    //api_key

    // Contecting the giphy API and the API key
    function ajaxcall(searchString) {


        var geturl = "https://api.giphy.com/v1/gifs/search?q=" + searchString + "&api_key=" + api_key;
        // Ajax "GET" method for giphys related to my search string

        $.ajax({
            method: 'GET',
            url: geturl
        }).then(function (response) {
           console.log(response);
                for(var i = 0; i < response.data.length; i++) {
                    var gif = response.data[i].images.fixed_height.url;
                    var gifdiv = '<div><img src = ' + gif + '></div>';
                    $('#giphys').append(gifdiv);
                 }
            });
    }

});