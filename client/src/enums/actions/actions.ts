export const ACTIONS = {
    'BranchNewNode': {
        name: 'BranchNewNode',
        type: 'constructive',
        callback: function(data: any) {
            let graphService = data.graphService;
            let newNodeData = {
                state: data.params[0].value,
                color: data.instructions[data.params[0].value].color
            }
            let currentNode = data.node;

            graphService.branchNewNode(currentNode, newNodeData);
        },
        isOnce: false,
        params: [{
            value: 'Start',
            type: 'state',
            description: 'NameOfState'
        }],
        description: 'ActionBranchNewNode'
    },
    'ConnectToAll': {
        name: 'ConnectToAll',
        type: 'constructive',
        callback: function(data: any) {
            data.graphService.connectToAll(data.node, data.params[0].value);
        },
        isOnce: false,
        params: [{
            value: 'Start',
            type: 'state',
            description: 'NameOfState'
        }],
        description: 'ActionConnectToAll'
    },
    'ConnectToNearest': {
        name: 'ConnectToNearest',
        type: 'constructive',
        callback: function(data: any) {
            let omitNeabours: boolean = false;
            data.graphService.connectToNearest(data.node, data.params[0].value, omitNeabours);
        },
        isOnce: false,
        params: [{
            value: 'Start',
            type: 'state',
            description: 'NameOfState'
        }],
        description: 'ActionConnectToNearest'
    },
    'BreakApart': {
        name: 'BreakApart',
        type: 'destructive',
        callback: function(data: any) {
            data.graphService.breakApart(data.node, data.params[0].value);
        },
        isOnce: false,
        params: [{
            value: 'Start',
            type: 'state',
            description: 'NameOfState'
        }],
        description: 'ActionBreakApart'
    },
    'DeleteCurrentNode': {
        name: 'DeleteCurrentNode',
        type: 'destructive',
        callback: function(data: any) {
            data.graphService.deleteNode(data.node);
        },
        isOnce: true,
        params: [] as Array<any>,
        description: 'ActionDeleteCurrentNode'
    }
}