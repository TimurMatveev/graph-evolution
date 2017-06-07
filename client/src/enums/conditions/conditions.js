"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONDITIONS = {
    'PreviousState': {
        name: 'PreviousState',
        callback: function (data) {
            var prevState = data.node.prevState;
            var checkState = data.params[0].value;
            return prevState == checkState;
        },
        isOnce: true,
        params: [{
                value: 'Start',
                type: 'state',
                description: 'NameOfPreviousState'
            }],
        description: 'ChecksPreviousState'
    },
    'LinksCount': {
        name: 'LinksCount',
        callback: function (data) {
            var linksCount = data.node.links.length;
            var leftLimit = data.params[0].value;
            var rightLimit = data.params[1].value;
            return leftLimit <= linksCount && linksCount <= rightLimit;
        },
        isOnce: true,
        params: [{
                value: '0',
                type: 'number',
                description: ''
            },
            {
                value: '0',
                type: 'number',
                description: ''
            }],
        description: 'ChecksIfLinksCountInRange'
    },
    'BornOnIteration': {
        name: 'BornOnIteration',
        callback: function (data) {
            var iteration = data.iteration;
            var leftLimit = data.params[0].value;
            var rightLimit = data.params[1].value;
            return leftLimit <= iteration && iteration <= rightLimit;
        },
        isOnce: true,
        params: [{
                value: '0',
                type: 'number',
                description: ''
            },
            {
                value: '0',
                type: 'number',
                description: ''
            }],
        description: 'ChecksIfNodeWasBornOnIterationInRange'
    },
    'Random': {
        name: 'Random',
        callback: function (data) {
            return Math.random() < data.params[0].value / 100;
        },
        isOnce: true,
        params: [{
                value: '0',
                type: 'number',
                description: '',
                min: 0,
                max: 100
            }],
        description: 'Random'
    }
};
//# sourceMappingURL=conditions.js.map