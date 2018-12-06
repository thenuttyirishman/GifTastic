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
    // Telling the giphy API what keywords to search for
    var searchString = "superHeros";
    // Making the search form input user data
    $('#search').on('click', function (event) {
        event.preventDefault();
        input = $('#input').val().trim();
        topics.push(input);
        renderButtons();
        ajaxcall(input);
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
            url: geturl,
            success: function(response) {
                console.log(response);
                for(var i = 0; i < response.length; i++) {
                    console.log("here");
                    var gif = response.data[i].images.original;
                    console.log("GIF: ", gif);
                    var gifdiv = '<div><img src = ' + gif + '></div>';
                    $('#giphys').append(gifdiv);
                 }
            }
        })
            // .then(function (response) {
            //     console.log(response);
            //     for(var i = 0; i < response.length; i++) {
            //         console.log("here");
            //         var gif = response.data[i].images.original;
            //         console.log("GIF: ", gif);
            //         var gifdiv = '<div><img src = ' + gif + '></div>';
            //         $('#giphys').append(gifdiv);
            //      }
            // });
    }
});