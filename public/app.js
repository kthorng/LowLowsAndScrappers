$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append(
            "<div class='col-sm-4'>" + 
            "<div class='card cardBlocks' style='width: 18rem;'>" + 
            "<div class='card-body'>" + 
            "<h5 class='card-title'><span class='cardHeader'>" + "<a href='" + data[i].link + "'" + "target='_blank'" + ">" + data[i].title + "</h5>" + 
            "<p class='card-text'" + data[i]._id + "'>" + data[i].img + 
            "</p>" + 
            "<a href='#'' class='btn btn-primary'>Go somewhere</a>" + 
            "</div>" + 
            "</div>" + 
            "</div>"
        );
    }
});