export const CONDITIONS = {
    'PreviousState': {
        name: 'PreviousState',
        callback: (data: any) => {
            let prevState = data.node.prevState;
            let checkState = data.params[0].value;
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
        callback: (data: any) => {
            let linksCount = data.node.links.length;
            let leftLimit = data.params[0].value;
            let rightLimit = data.params[1].value;
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
        callback: (data: any) => {
            let iteration = data.iteration;
            let leftLimit = data.params[0].value;
            let rightLimit = data.params[1].value;
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
        callback: (data: any) => {
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