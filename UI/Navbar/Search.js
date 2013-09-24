'use strict';
define(
    [
        'app',
        'Series/SeriesCollection'
    ], function (App, SeriesCollection) {
        $(document).on('keydown', function (e){
            if ($(e.target).is('input')) {
                return;
            }

            if (e.keyCode === 84) {
                $('.x-series-search').focus();
                e.preventDefault();
            }
        });

        $.fn.bindSearch = function () {
            $(this).typeahead({
                source   : function () {
                    return SeriesCollection.pluck('title');
                },

                sorter: function (items) {
                    return items.sort();
                },

                updater: function (item) {
                    var series = SeriesCollection.findWhere({ title: item });

                    this.$element.blur();
                    App.Router.navigate('/series/{0}'.format(series.get('titleSlug')), { trigger: true });
                }
            });
        };
    });
