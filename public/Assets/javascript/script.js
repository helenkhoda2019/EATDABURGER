$(document).ready(function(){
    $(".devour-form").on("submit", function(event){
        console.log("inside on click devour")
        event.preventDefault();
        var burger_id = $(this).children(".burger_id").val();
        console.log(" id of the burger : " +burger_id);
        $.ajax({
            method: "PUT",
            url: "/burgers/" + burger_id
        }).then(function(data){
            // reload page and add burger to right side
            location.reload();

        })
    })
})