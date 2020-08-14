$(document).ready(function () {
    var engine, remoteHost, template, empty;

    $.support.cors = false;

    remoteHost = 'http://localhost:3000';
    template = Handlebars.compile($("#tcSearchResult").html());
    empty = Handlebars.compile($("#tcEmptyResult").html());

    engine = new Bloodhound({
        identify: function (o) {
            return o.userID;
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('userName'),
        // datumTokenizer:Bloodhound.tokenizers.whitespace,
        prefetch: remoteHost + '/account/selectUsers',
        remote: {
            url: remoteHost + '/account/selectUsers?queryConditions=%QUERY',
            wildcard: '%QUERY'
        }
    });

    // ensure default users are read on initialization
    // 读取默认用户要改成读取默认组，可能不需要用typeahead来写

    function engineWithDefaults(q, sync, async) {
        if (q.length<=0) {
            sync(engine.all());
            async([]);
        } else {
            engine.search(q, sync, async)

        }
    }

    $('#tcSearch').typeahead({
        hint: false,
        menu: $('.ppt_tbody'),
        minLength: 0,
        classNames: {
            open: 'is-open',
            empty: 'is-empty',
            cursor: 'is-active',
            suggestion: 'Typeahead-suggestion',
            selectable: 'Typeahead-selectable'
        }
    }, {
        limit:100,
        source: engineWithDefaults,
        displayKey: 'userName',
        templates: {
            suggestion: template,
            empty: empty
        }
    }).on('typeahead:asyncrequest', function () {
        $('.Typeahead-spinner').show();
    })
        .on('typeahead:asynccancel typeahead:asyncreceive', function () {
            $('.Typeahead-spinner').hide();
        });

});