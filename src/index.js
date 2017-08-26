$(document).ready(function() {
    
    var side = "front";
    var quote;
    var author;
    callQuote();

    $(".tweet-button").click(function() {
        openWindow('https://twitter.com/intent/tweet?&text=' + '"' + quote + '" ' + author);
    })

    $(".flip-button").click(function() {
        $('.card').toggleClass('flipped');
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

                // call new quote if the string is too long to fit the window
                // would consider twitter lengt limitation of 140?
                if (post.content.length > 360) {
                    callQuote()
                    return
                }
                
                if (side === "front") {
                    $('#front-title').text(post.title);
                    $('#front-content').html(post.content);
                    side = "back";
                    quote = strip(post.content);
                    author = strip(post.title);
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
    