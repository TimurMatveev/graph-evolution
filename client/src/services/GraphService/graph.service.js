"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Constants_1 = require("../../constants/Constants");
var watchableStorage_service_1 = require("../WatchableStorageService/watchableStorage.service");
var GraphService = (function () {
    function GraphService(WatchableStorage) {
        this.WatchableStorage = WatchableStorage;
        this.nextId = 0;
        this.nodesToDelete = [];
        this.graph = new Constants_1.VIVA_GRAPH.graph();
        this.graphsCallbacks = {
            'noLinks': function (n) {
                var graph = Constants_1.VIVA_GRAPH.generator().noLinks(n);
                var nextId = n;
                graph.forEachNode(function (node) {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'grid': function (n, m) {
                var graph = Constants_1.VIVA_GRAPH.generator().grid(n, m);
                var nextId = n * m;
                graph.forEachNode(function (node) {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'balancedBinTree': function (n) {
                var gen = Constants_1.VIVA_GRAPH.generator();
                var graph = gen.balancedBinTree(n);
                var nextId = Math.pow(2, n + 1) - 1;
                graph.forEachNode(function (node) {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'cicle': function (n) {
                var gen = Constants_1.VIVA_GRAPH.generator();
                var graph = gen.path(n);
                graph.addLink(0, n - 1);
                var nextId = n;
                graph.forEachNode(function (node) {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'complete': function (n) {
                var gen = Constants_1.VIVA_GRAPH.generator();
                var graph = gen.complete(n);
                var nextId = n;
                graph.forEachNode(function (node) {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'completeBipartite': function (n, m) {
                var gen = Constants_1.VIVA_GRAPH.generator();
                var graph = gen.completeBipartite(n, m);
                var nextId = n + m;
                graph.forEachNode(function (node) {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'grid3': function (n, m, z) {
                var graph = Constants_1.VIVA_GRAPH.generator().grid3(n, m, z);
                var nextId = n * m * z;
                graph.forEachNode(function (node) {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            }
        };
        this.avaliableGraphs = [
            {
                name: 'NoLinks',
                selected: false,
                callback: this.graphsCallbacks.noLinks,
                params: [
                    { value: '1' }
                ],
                description: "GraphNoLinks"
            },
            {
                name: 'BalancedBinTree',
                selected: false,
                callback: this.graphsCallbacks.balancedBinTree,
                params: [
                    { value: '6' }
                ],
                description: "GraphBalancedBinTree"
            },
            {
                name: 'Cicle',
                selected: false,
                callback: this.graphsCallbacks.cicle,
                params: [
                    { value: '32' }
                ],
                description: "GraphCicle"
            },
            {
                name: 'Complete',
                selected: false,
                callback: this.graphsCallbacks.complete,
                params: [
                    { value: '5' }
                ],
                description: "GraphComplete"
            },
            {
                name: 'CompleteBipartite',
                selected: false,
                callback: this.graphsCallbacks.completeBipartite,
                params: [
                    { value: '3' },
                    { value: '3' }
                ],
                description: "GraphCompleteBipartite"
            },
            {
                name: 'Grid',
                selected: true,
                callback: this.graphsCallbacks.grid,
                params: [
                    { value: '24' },
                    { value: '24' }
                ],
                description: "GraphGrid"
            },
            {
                name: 'Grid3',
                selected: false,
                callback: this.graphsCallbacks.grid3,
                params: [
                    { value: '3' },
                    { value: '3' },
                    { value: '3' }
                ],
                description: "GraphGrid3"
            }
        ];
    }
    ;
    GraphService.prototype.findNearest = function (node, state, omitNeibours) {
        var _this = this;
        var FN_ = function (node, state) {
            if (!node.checked) {
                if (node.data.state === state) {
                    return node;
                }
                node.checked = true;
            }
            _this.graph.forEachLinkedNode(node.id, function (linkedNode) {
                if (!linkedNode.checked && !observeQueue.find(function (el) { return el == linkedNode; })) {
                    observeQueue.push(linkedNode);
                }
            }, false);
            return null;
        };
        node.checked = true;
        var observeQueue = [];
        this.graph.forEachLinkedNode(node.id, function (linkedNode) {
            if (omitNeibours) {
                linkedNode.checked = true;
            }
            observeQueue.push(linkedNode);
        }, false);
        var nearestNode;
        while (observeQueue.length) {
            nearestNode = FN_(observeQueue.shift(), state);
            if (nearestNode) {
                break;
            }
        }
        this.graph.forEachNode(function (node) { node.checked = undefined; });
        return nearestNode;
    };
    GraphService.prototype.isLinked = function (node1, node2) {
        return this.graph.hasLink(node1.id, node2.id) || this.graph.hasLink(node2.id, node1.id);
    };
    GraphService.prototype.branchNewNode = function (fromNode, newNodeData) {
        var newNode = this.graph.addNode(this.nextId++, { state: newNodeData.state, color: newNodeData.color });
        var fromUi = this.graphics.getNodeUI(fromNode.id);
        var newUi = this.graphics.getNodeUI(newNode.id);
        newUi.position.x = fromUi.position.x + (Math.random() - 0.5);
        newUi.position.y = fromUi.position.y + (Math.random() - 0.5);
        this.graph.addLink(fromNode.id, newNode.id);
    };
    ;
    GraphService.prototype.connectToAll = function (currentNode, state) {
        var _this = this;
        this.graph.forEachNode(function (node) {
            if (currentNode != node && node.data.state == state && !_this.isLinked(currentNode, node)) {
                _this.graph.addLink(currentNode.id, node.id);
            }
        });
    };
    GraphService.prototype.connectToNearest = function (node, state, omitNeibours) {
        var nearestNode = this.findNearest(node, state, omitNeibours);
        if (nearestNode) {
            this.graph.addLink(node.id, nearestNode.id);
        }
    };
    GraphService.prototype.breakApart = function (node, state) {
        for (var i = 0; i < node.links.length; i++) {
            var link = node.links[i];
            var id = link.fromId == node.id ? link.toId : link.fromId;
            var neibourNode = this.graph.getNode(id);
            if (state ? neibourNode.data.state == state : true) {
                this.graph.removeLink(link);
                i--;
            }
        }
    };
    GraphService.prototype.deleteNode = function (node) {
        this.changeNodeState(node, "", 0xffffff);
        this.nodesToDelete.push(node.id);
        this.breakApart(node);
    };
    GraphService.prototype.clearTrash = function () {
        var _this = this;
        var deleteNextNode = function () {
            var deleteId = _this.nodesToDelete.pop();
            if (deleteId) {
                _this.graph.removeNode(deleteId);
            }
            else {
                clearInterval(interval);
            }
        };
        var interval = setInterval(function () {
            deleteNextNode();
        }, 0);
    };
    GraphService.prototype.forEachNode = function (callback) {
        this.graph.forEachNode(callback);
    };
    ;
    GraphService.prototype.setGraph = function (graph) {
        if (graph) {
            this.graph = graph;
        }
        else {
            try {
                var selected = this.avaliableGraphs.find(function (graph) { return graph.selected; });
                var params = selected.params.map(function (item) { return parseInt(item.value); });
                var result = selected.callback.apply(selected, params);
                this.graph = result.graph;
                this.nextId = result.nextId;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    ;
    GraphService.prototype.getGraph = function () {
        return this.graph;
    };
    ;
    GraphService.prototype.changeSelected = function (value) {
        this.avaliableGraphs.find(function (item) { return item.selected; }).selected = false;
        this.avaliableGraphs.find(function (item) { return item.name == value.name; }).selected = true;
    };
    ;
    GraphService.prototype.changeNodeState = function (node, state, color) {
        if (this.graph.getNode(node.id) && !this.nodesToDelete.includes(node.id)) {
            node.data.state = state;
            var nodeUI = this.graphics.getNodeUI(node.id);
            nodeUI.color = color;
            nodeUI.size = state == "Start" || "Stop" ? 12 : 18;
        }
    };
    GraphService.prototype.render = function (wrapper) {
        var _this = this;
        this.wrapper = wrapper;
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.graphics = Constants_1.VIVA_GRAPH.View.webglGraphics();
        var layout = Constants_1.VIVA_GRAPH.Layout.forceDirected(this.graph, {
            springLength: 50,
            springCoeff: 0.00008,
            dragCoeff: 0.02,
            gravity: -1.2
        });
        var circleNode = this.buildCircleNodeShader();
        this.graphics.setNodeProgram(circleNode);
        this.graphics.node(function (node) {
            return new WebglCircle(12, node.data.color);
        });
        this.renderer = Constants_1.VIVA_GRAPH.View.renderer(this.graph, {
            layout: layout,
            graphics: this.graphics,
            container: wrapper
        });
        this.renderer.run();
        this.pinFunction = layout.pinNode;
        this.graphics.webglInputEvents;
        this.graphics.webglInputEvents.click(function (node) {
            var isPinMode = _this.WatchableStorage.get("nodePinMode");
            setTimeout(function () {
                var nodeUI = _this.graphics.getNodeUI(node.id);
                if (isPinMode) {
                    layout.pinNode(node, true);
                    nodeUI.size = 18;
                }
                else {
                    layout.pinNode(node, false);
                    nodeUI.size = 12;
                }
            }, 0);
        });
        this.graphics.webglInputEvents.dblClick(function (node) {
            setTimeout(function () {
                _this.graphics.getNodeUI(node.id).size = 12;
                layout.pinNode(node, false);
            }, 0);
        });
        window.addEventListener("resize", function () { _this.renderer.reset(); });
    };
    ;
    GraphService.prototype.setAllNodesPin = function (isPin) {
        var _this = this;
        this.graph.forEachNode(function (node) {
            var nodeUI = _this.graphics.getNodeUI(node.id);
            if (isPin) {
                _this.pinFunction(node, true);
                nodeUI.size = 18;
            }
            else {
                _this.pinFunction(node, false);
                nodeUI.size = 12;
            }
        });
    };
    GraphService.prototype.rerender = function () {
        if (this.wrapper) {
            this.render(this.wrapper);
        }
    };
    ;
    GraphService.prototype.buildCircleNodeShader = function () {
        // For each primitive we need 4 attributes: x, y, color and size.
        var ATTRIBUTES_PER_PRIMITIVE = 4, nodesFS = [
            'precision mediump float;',
            'varying vec4 color;',
            'void main(void) {',
            '   if ((gl_PointCoord.x - 0.5) * (gl_PointCoord.x - 0.5) + (gl_PointCoord.y - 0.5) * (gl_PointCoord.y - 0.5) < 0.25) {',
            '     gl_FragColor = color;',
            '   } else {',
            '     gl_FragColor = vec4(0);',
            '   }',
            '}'
        ].join('\n'), nodesVS = [
            'attribute vec2 a_vertexPos;',
            // Pack color and size into vector. First elemnt is color, second - size.
            // Since it's floating point we can only use 24 bit to pack colors...
            // thus alpha channel is dropped, and is always assumed to be 1.
            'attribute vec2 a_customAttributes;',
            'uniform vec2 u_screenSize;',
            'uniform mat4 u_transform;',
            'varying vec4 color;',
            'void main(void) {',
            '   gl_Position = u_transform * vec4(a_vertexPos/u_screenSize, 0, 1);',
            '   gl_PointSize = a_customAttributes[1] * u_transform[0][0];',
            '   float c = a_customAttributes[0];',
            '   color.b = mod(c, 256.0); c = floor(c/256.0);',
            '   color.g = mod(c, 256.0); c = floor(c/256.0);',
            '   color.r = mod(c, 256.0); c = floor(c/256.0); color /= 255.0;',
            '   color.a = 1.0;',
            '}'
        ].join('\n');
        var program, webglUtils, gl, buffer, locations, utils, nodes = new Float32Array(64), nodesCount = 0, canvasWidth, canvasHeight, transform, isCanvasDirty;
        return {
            /**
             * Called by webgl renderer to load the shader into gl context.
             */
            load: function (glContext) {
                gl = glContext;
                webglUtils = Constants_1.VIVA_GRAPH.webgl(glContext);
                program = webglUtils.createProgram(nodesVS, nodesFS);
                gl.useProgram(program);
                locations = webglUtils.getLocations(program, ['a_vertexPos', 'a_customAttributes', 'u_screenSize', 'u_transform']);
                gl.enableVertexAttribArray(locations.vertexPos);
                gl.enableVertexAttribArray(locations.customAttributes);
                buffer = gl.createBuffer();
            },
            /**
             * Called by webgl renderer to update node position in the buffer array
             *
             * @param nodeUI - data model for the rendered node (WebGLCircle in this case)
             * @param pos - {x, y} coordinates of the node.
             */
            position: function (nodeUI, pos) {
                var idx = nodeUI.id;
                nodes[idx * ATTRIBUTES_PER_PRIMITIVE] = pos.x;
                nodes[idx * ATTRIBUTES_PER_PRIMITIVE + 1] = -pos.y;
                nodes[idx * ATTRIBUTES_PER_PRIMITIVE + 2] = nodeUI.color;
                nodes[idx * ATTRIBUTES_PER_PRIMITIVE + 3] = nodeUI.size;
            },
            /**
             * Request from webgl renderer to actually draw our stuff into the
             * gl context. This is the core of our shader.
             */
            render: function () {
                gl.useProgram(program);
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, nodes, gl.DYNAMIC_DRAW);
                if (isCanvasDirty) {
                    isCanvasDirty = false;
                    gl.uniformMatrix4fv(locations.transform, false, transform);
                    gl.uniform2f(locations.screenSize, canvasWidth, canvasHeight);
                }
                gl.vertexAttribPointer(locations.vertexPos, 2, gl.FLOAT, false, ATTRIBUTES_PER_PRIMITIVE * Float32Array.BYTES_PER_ELEMENT, 0);
                gl.vertexAttribPointer(locations.customAttributes, 2, gl.FLOAT, false, ATTRIBUTES_PER_PRIMITIVE * Float32Array.BYTES_PER_ELEMENT, 2 * 4);
                gl.drawArrays(gl.POINTS, 0, nodesCount);
            },
            /**
             * Called by webgl renderer when user scales/pans the canvas with nodes.
             */
            updateTransform: function (newTransform) {
                transform = newTransform;
                isCanvasDirty = true;
            },
            /**
             * Called by webgl renderer when user resizes the canvas with nodes.
             */
            updateSize: function (newCanvasWidth, newCanvasHeight) {
                canvasWidth = newCanvasWidth;
                canvasHeight = newCanvasHeight;
                isCanvasDirty = true;
            },
            /**
             * Called by webgl renderer to notify us that the new node was created in the graph
             */
            createNode: function (node) {
                nodes = webglUtils.extendArray(nodes, nodesCount, ATTRIBUTES_PER_PRIMITIVE);
                nodesCount += 1;
            },
            /**
             * Called by webgl renderer to notify us that the node was removed from the graph
             */
            removeNode: function (node) {
                if (nodesCount > 0) {
                    nodesCount -= 1;
                }
                if (node.id < nodesCount && nodesCount > 0) {
                    // we do not really delete anything from the buffer.
                    // Instead we swap deleted node with the "last" node in the
                    // buffer and decrease marker of the "last" node. Gives nice O(1)
                    // performance, but make code slightly harder than it could be:
                    webglUtils.copyArrayPart(nodes, node.id * ATTRIBUTES_PER_PRIMITIVE, nodesCount * ATTRIBUTES_PER_PRIMITIVE, ATTRIBUTES_PER_PRIMITIVE);
                }
            },
            /**
             * This method is called by webgl renderer when it changes parts of its
             * buffers. We don't use it here, but it's needed by API (see the comment
             * in the removeNode() method)
             */
            replaceProperties: function (replacedNode, newNode) { },
        };
    };
    ;
    return GraphService;
}());
GraphService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [watchableStorage_service_1.WatchableStorage])
], GraphService);
exports.GraphService = GraphService;
;
var WebglCircle = (function () {
    function WebglCircle(size, color) {
        this.size = size;
        this.color = color;
    }
    ;
    return WebglCircle;
}());
//# sourceMappingURL=graph.service.js.map