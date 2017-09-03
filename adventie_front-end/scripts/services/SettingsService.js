var SettingsService = function (API, $resource) {

    var SettingsService = $resource( API.url + '/tags/:tagId', {tagId: '@tagId',systemVariableId: '@systemVariableId',templateId: '@templateId'}, {

        queryTags: {
            url: API.url +  '/tags/',
            isArray: true,
            method: 'GET',
        },
        saveTag: {
            url: API.url +  '/tags/',
            method: 'POST'
        },
        removeTag: {
            url: API.url +  '/tags/:tagId',
            method: 'DELETE'
        },
        updateTag: {
            url: API.url +  '/tags/:tagId',
            method: 'PUT'
        },

        querySystemVariables: {
            url: API.url +  '/systemVariables/',
            isArray: true,
            method: 'GET',
        },
        saveSystemVariable: {
            url: API.url +  '/systemVariable/',
            method: 'POST'
        },
        removeSystemVariable: {
            url: API.url +  '/systemVariable/:systemVariableId',
            method: 'DELETE'
        },
        updateSystemVariable: {
            url: API.url +  '/systemVariable/:systemVariableId',
            method: 'PUT'
        },

        queryTemplates: {
            url: API.url +  '/template/',
            isArray: true,
            method: 'GET',
        },
        addTemplate: {
            url: API.url +  '/template/',
            method: 'POST'
        },
        saveTemplate: {
            url: API.url +  '/template/:templateId',
            method: 'PUT'
        },
        resetTemplate: {
            url: API.url +  '/template/:templateId/reset',
            method: 'PUT'
        },
        resetAll: {
            url: API.url +  '/template/',
            method: 'DELETE'
        }

    });

    return SettingsService;

};

module.exports = SettingsService;
