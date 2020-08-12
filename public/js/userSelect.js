$(document).ready(function () {
    var engine, remoteHost, template, empty;

    $.support.cors = false;

    remoteHost = 'http://localhost:3000';
    template = Handlebars.compile($("#result-template").html());
    empty = Handlebars.compile($("#empty-template").html());

    engine = new Bloodhound({
        identify: function (o) {
            return o.userID;
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('userName'),
        // datumTokenizer:Bloodhound.tokenizers.whitespace,
        prefetch: remoteHost + '/account/selectUsers',
        remote: {
            url: remoteHost + '/account/selectUsers?q=%QUERY',
            wildcard: '%QUERY'
        }
    });

    // ensure default users are read on initialization
    console.log(engine.get([1000000, 1000001]))

    function engineWithDefaults(q, sync, async) {
        if (q === '') {
            sync(engine.get(1000000, 1000001, 1000005, 1000057));
            async([]);
        } else {
            engine.search(q, sync, async)
        }
    }

    $('#demo-input').typeahead({
        hint: $('.Typeahead-hint'),
        menu: $('.Typeahead-menu'),
        minLength: 0,
        classNames: {
            open: 'is-open',
            empty: 'is-empty',
            cursor: 'is-active',
            suggestion: 'Typeahead-suggestion',
            selectable: 'Typeahead-selectable'
        }
    }, {
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