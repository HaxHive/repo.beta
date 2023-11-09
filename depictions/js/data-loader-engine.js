function data_loader_engine(contentBlocks, xml) {
    for (var key in contentBlocks) {
        console.log('Processing ' + key);
        console.log('  type= ' + contentBlocks[key].type);

        // Check if the key element exists
        if (!$(key).length) {
            continue;
        }

        var contentInfo = contentBlocks[key];

        switch (contentInfo.type) {
            case "text":
                var content = $(xml).find(contentInfo.source).text();
                $(key).html(content);
                break;

            case "link":
                console.log('  url= ' + contentInfo.url);
                console.log('  text= ' + contentInfo.text);

                var url = contentInfo.url;
                var params = [];
                if (contentInfo.params) {
                    for (var i = 0; i < contentInfo.params.length; i++) {
                        contentInfo.params[i][1] = escape(contentInfo.params[i][1]);
                        params.push(contentInfo.params[i].join('='));
                    }
                }
                url = url + '?' + params.join('&');
                $(key).append(
                    $("<a></a>")
                        .attr("href", url)
                        .text(contentInfo.text)
                );
                break;

            case "list":
                var list = $(xml).find(contentInfo.source);

                if (list.size() == 0) {
                    if (contentInfo.emptyListCallback) {
                        contentInfo.emptyListCallback($(key));
                    }
                } else {
                    if (!!contentInfo.reverseRender) {
                        list = $(list).get().reverse();
                    }
                    for (var i = 0; i < list.length; i++) {
                        var item = $(list[i]).text();

                        if (!!contentInfo.reverseRender) {
                            $(key).prepend($(contentInfo.paragraphElement).html("<p>" + item + "</p>"));
                        } else {
                            $(key).append($(contentInfo.paragraphElement).html("<p>" + item + "</p>"));
                        }
                    }
                }
                break;

            case "articles":
                var articles = $(xml).find(contentInfo.source).children();
                var titleID = 0;
                for (var i = 0; i < articles.length; i++) {
                    var article = articles[i];
                    var articleTitle = $(article).find(contentInfo.titleSource).text();
                    $(key).append($(contentInfo.titleElement).html(articleTitle));
                    var container = $(contentInfo.paragraphContainer).attr("id", ++titleID);
                    $(key).append($(container));
                    var paragraphs = $(article).find(contentInfo.paragraphSource);
                    for (var j = 0; j < paragraphs.length; j++) {
                        $(container).append($(contentInfo.paragraphElement).html("<p>" + $(paragraphs[j]).text() + "</p>"));
                    }
                }
                break;

            case "custom":
                if (!key) {
                    return;
                }
                contentInfo.render($(key), $(xml).find(contentInfo.source));
                break;
        }
    }
}
