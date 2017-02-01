$(document).ready(function(){


// SEARCH BUTTON ON CLICK EVENT
// ============================================
$('#searchButton').on('click', function() {
    event.preventDefault();
    var userData = "";
    var keyword = "";
    var location = "";

    keyword = $('#keyword').val();
    location = $('#location').val();
    userData = {location: location, keyword: keyword};
    
    console.log(userData);
    // AJAX post the data to the server. 
    var currentURL = window.location.origin;
    console.log(currentURL)
    // $.post(currentURL + "/", userData, function(data){
    // console.log(data);

    // }); // END $.post "/search"

    $('#keyword').val("");
    $('#location').val("");
}) // END #searchButton.on('click'
// ============================================



// COLLAPSE AND OPEN HAMBURGER/NAVBAR MENU
// ============================================
$(".navbar-toggle").click(function(event) {
    $(".navbar-collapse").toggle('in');
});
// ============================================



  // GOOGLE PLACES AUTOCOMPLETE
// ============================================
   function initialize() {

    var options = {
  types: ['(cities)'],
  componentRestrictions: {country: "us"}
 };

      var input = document.getElementById('location');
      var autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.addListener('place_changed', fillInAddress);
   

   function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  var address = place.formatted_address.replace(", USA","")

          $('#location').val(address);
        locale = address;

}
}

   // google.maps.event.addDomListener(window, 'load', initialize);

// GOOGLE PLACES AUTOCOMPLETE
// ============================================








}); // End document.ready function(){}