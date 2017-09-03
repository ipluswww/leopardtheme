var ContactService = function (API, $resource) {

    var ContactService = $resource( API.url + '/contact/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true,
            url: API.url + '/contact/'
        },
        get: {
            url: API.url + '/contact/:id',
            method: 'GET'
        },
        save: {
            url: API.url + '/contact',
            method: 'POST'
        },
        update: {
            url: API.url + '/contact/:id',
            method:'PUT'
        },
        reply: {
            url: API.url + '/contact/:id/reply',
            method:'PUT'
        },
        remove: {
            method: 'DELETE'
        }
    });

    return ContactService;

};

module.exports = ContactService;
