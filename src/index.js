$(document).ready(function() {
    
    // var side = "front";
    // callQuote();
    
    // $(".inner-btn").click(function() {
    //     document.querySelector(".flip-container").classList.toggle("flip");
    //     e.preventDefault();
    //     callQuote();
    // })
    
    // $(".out-btn").click(function(e) {    
    //     e.preventDefault();
    //     callQuote();
    // })

    $("#flip-button").click(function() {
        $('.card').toggleClass('flipped');
        window.console&&console.log('PRSSSED');
    })
      
    function callQuote() {
  
        var href = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
  
        $.ajax({
            url: href,
            success: function(data) {
                var post = data.shift(); // The data is an array of posts. Grab the first one.
                window.console&&console.log('FOO POST: ', post);
                
                if (side === "front") {
                    window.console&&console.log("THIS IS FRONT");
                    $('#front-title').text(post.title);
                    $('#front-content').html(post.content);
                    side = "back";
                } else {
                    $('#back-title').text(post.title);
                    $('#back-content').html(post.content);
                    side = "front";
                }
        
                // If the Source is available, use it. Otherwise hide it.
                if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                    $('#quote-source').html('Source:' + post.custom_meta.Source);
                } else {
                    $('#quote-source').text('');
                }
            },
            cache: false
        })
    }  
      
})
    