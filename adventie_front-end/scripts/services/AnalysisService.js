var AnalysisService = function (API, $resource) {

    var AnalysisService = $resource( API.url + '/article/:id', {},{
        businesses: {
            method: 'GET',
            url:  API.url +  '/analysis/businesses/'
        },
        active_businesses: {
            method: 'GET',
            url:  API.url +  '/analysis/businesses/active'
        },
        published_businesses: {
            method: 'GET',
            url:  API.url +  '/analysis/businesses/published'
        },
        pending_businesses: {
            method: 'GET',
            url:  API.url +  '/analysis/businesses/pending'
        },
        by_date_businesses: {
            method: 'GET',
            url:  API.url +  '/analysis/businesses/date'
        },

        users: {
            method: 'GET',
            url:  API.url +  '/analysis/users/'
        },
        active_users: {
            method: 'GET',
            url:  API.url +  '/analysis/users/active'
        },
        regular_users: {
            method: 'GET',
            url:  API.url +  '/analysis/users/regular'
        },
        business_users: {
            method: 'GET',
            url:  API.url +  '/analysis/users/buisiness'
        },

        articles: {
            method: 'GET',
            url:  API.url +  '/analysis/articles/'
        },
        active_articles: {
            method: 'GET',
            url:  API.url +  '/analysis/articles/active'
        },
        published_articles: {
            method: 'GET',
            url:  API.url +  '/analysis/articles/published'
        },
        pending_articles: {
            method: 'GET',
            url:  API.url +  '/analysis/articles/pending'
        },

        events: {
            method: 'GET',
            url:  API.url +  '/analysis/events/'
        },
        active_events: {
            method: 'GET',
            url:  API.url +  '/analysis/events/active'
        },
        published_events: {
            method: 'GET',
            url:  API.url +  '/analysis/events/published'
        },
        pending_events: {
            method: 'GET',
            url:  API.url +  '/analysis/events/pending'
        },
    });

    return AnalysisService;

};

module.exports = AnalysisService;
