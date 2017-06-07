"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIONS = {
    'BranchNewNode': {
        name: 'BranchNewNode',
        type: 'constructive',
        callback: function (data) {
            var graphService = data.graphService;
            var newNodeData = {
                state: data.params[0].value,
                color: data.instructions[data.params[0].value].color
            };
            var currentNode = data.node;
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
        callback: function (data) {
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
        callback: function (data) {
            var omitNeabours = false;
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
        callback: function (data) {
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
        callback: function (data) {
            data.graphService.deleteNode(data.node);
        },
        isOnce: true,
        params: [],
        description: 'ActionDeleteCurrentNode'
    }
};
//# sourceMappingURL=actions.js.map