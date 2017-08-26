$(document).ready(function() {
    
    var side = "front";
    var quote;
    var author;
    callQuote();

    $(".tweet-button").click(function() {
        window.console&&console.log('TWEET PRSSSED');
        openWindow('https://twitter.com/intent/tweet?&text=' + '"' + quote + '" ' + author);
    })

    $(".flip-button").click(function() {
        $('.card').toggleClass('flipped');
        window.console&&console.log('PRSSSED');
        callQuote();
    })

    function strip(html) {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       totrim = tmp.textContent || tmp.innerText || "";
       return $.trim(totrim);
    }

    function openWindow(url) {
        window.open(url);
    }
      
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
                    quote = strip(post.content);
                    author = strip(post.title);
                    window.console&&console.log(author);
                    window.console&&console.log(quote);
                } else {
                    $('#back-title').text(post.title);
                    $('#back-content').html(post.content);
                    side = "front";
                    quote = strip(post.content);
                    author = strip(post.title);
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
    