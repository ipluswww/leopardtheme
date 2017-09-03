var ArticleService = function (API, $resource) {

    var ArticleService = $resource( API.url + '/article/:id', {id: '@id', photoId: '@photoId', tag: '@tag', collectionId: '@collectionId', commentId: '@commentId'}, {
        query: {
            method: 'GET',
            isArray: true,
            url:  API.url +  '/articles/'
        },
        getPublished: {
            method: 'GET',
            isArray: true,
            url:  API.url +  '/articles?published=TRUE'
        },
        getPending: {
            method: 'GET',
            isArray: true,
            url:  API.url +  '/articles?status=PENDING'
        },
        update: {
            url:  API.url +  '/article/:id',
            method:'PUT'
        },
        save: {
            url:  API.url +  '/article/',
            method: 'POST'
        },
        addPhotos: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/photo',
            method: 'POST'
        },
        removePhoto: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/photo/:photoId',
            method: 'DELETE'
        },
        addTag: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/tag',
            method: 'POST'
        },
        removeTag: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/tag/:tag',
            method: 'DELETE'
        },
        addLike: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/like',
            method: 'POST'
        },
        removeLike: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/like/',
            method: 'DELETE'
        },
        addCollection: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/collection',
            method: 'POST'
        },
        removeCollection: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/collection/:collectionId',
            method: 'DELETE'
        },
        addComment: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/comment',
            method: 'POST'
        },
        removeComment: {
            headers: {'Content-Type': undefined},
            url:  API.url +  '/article/:id/comment/:commentId',
            method: 'DELETE'
        },
        suspend: {
            url:  API.url +  '/article/:id/suspend',
            method: 'POST'
        },
        approve: {
            url:  API.url +  '/article/:id/approve',
            method: 'PUT'
        },
        publish: {
            url:  API.url +  '/article/:id/publish',
            method: 'PUT'
        },
        hold: {
            url:  API.url +  '/article/:id/hold',
            method: 'PUT'
        },
        provoke: {
            url:  API.url +  '/article/:id/provoke',
            method: 'PUT'
        },
        remove: {
            method: 'DELETE',
            url: API.url + '/article/:id/'
        }
    });

    return ArticleService;

};

module.exports = ArticleService;
