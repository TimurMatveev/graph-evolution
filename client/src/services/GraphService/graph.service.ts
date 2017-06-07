import { Injectable } from '@angular/core';
import { VIVA_GRAPH } from '../../constants/Constants';

import { WatchableStorage } from '../WatchableStorageService/watchableStorage.service';

@Injectable()
export class GraphService {
    private graph: any;
    private graphics: any;
    private renderer: any;
    private wrapper: Node;
    private graphsCallbacks: any;
    private nextId: number = 0;
    private nodesToDelete: Array<any> = [];
    private pinFunction: Function;
    
    public avaliableGraphs: Array<any>;

    constructor(
        private WatchableStorage: WatchableStorage
    ) {
        this.graph = new VIVA_GRAPH.graph();

        this.graphsCallbacks = {
            'noLinks': (n: number) => {
                let graph = VIVA_GRAPH.generator().noLinks(n);
                let nextId = n;
                graph.forEachNode((node: any) => {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'grid': (n: number, m: number) => {
                let graph = VIVA_GRAPH.generator().grid(n, m);
                let nextId = n * m;
                graph.forEachNode((node: any) => {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'balancedBinTree': (n: number) => {
                let gen = VIVA_GRAPH.generator();
                let graph = gen.balancedBinTree(n);
                let nextId = Math.pow(2, n + 1) - 1;
                graph.forEachNode((node: any) => {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'cicle': (n: number) => {
                let gen = VIVA_GRAPH.generator();
                let graph = gen.path(n);
                graph.addLink(0, n - 1);
                let nextId = n;
                graph.forEachNode((node: any) => {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'complete': (n: number) => {
                let gen = VIVA_GRAPH.generator();
                let graph = gen.complete(n);
                let nextId = n;
                graph.forEachNode((node: any) => {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'completeBipartite': (n: number, m: number) => {
                let gen = VIVA_GRAPH.generator();
                let graph = gen.completeBipartite(n, m);
                let nextId = n + m;
                graph.forEachNode((node: any) => {
                    node.data = {
                        state: 'Start',
                        color: '0x009ee8'
                    };
                });
                return { graph: graph, nextId: nextId };
            },
            'grid3': (n: number, m: number, z: number) => {
                let graph = VIVA_GRAPH.generator().grid3(n, m, z);
                let nextId = n * m * z;
                graph.forEachNode((node: any) => {
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
    };

    findNearest(node: any, state: string, omitNeibours?: boolean): any {
        let FN_ = (node: any, state: string): any => {
            if (!node.checked) {
                if (node.data.state === state) {
                    return node;
                }
                node.checked = true;
            }

            this.graph.forEachLinkedNode(node.id, (linkedNode: any) => {
                if (!linkedNode.checked && !observeQueue.find(el => el == linkedNode)) {
                    observeQueue.push(linkedNode);
                }
            }, false);

            return null;
        }

        node.checked = true;
        let observeQueue:Array<any> = [];

        this.graph.forEachLinkedNode(node.id, (linkedNode: any) => {
            if (omitNeibours) {
                linkedNode.checked = true;
            }
            observeQueue.push(linkedNode);
        }, false);

        let nearestNode: any;
        while (observeQueue.length) {
            nearestNode = FN_(observeQueue.shift(), state);
            if (nearestNode) {
                break;
            }
        }

        this.graph.forEachNode((node: any) => { node.checked = undefined });

        return nearestNode;
    }

    isLinked(node1: any, node2: any) {
        return this.graph.hasLink(node1.id, node2.id) || this.graph.hasLink(node2.id, node1.id);
    }

    branchNewNode(fromNode: any, newNodeData: any) {
        let newNode: any = this.graph.addNode(this.nextId++, {state: newNodeData.state, color: newNodeData.color});
        let fromUi: any = this.graphics.getNodeUI(fromNode.id);
        let newUi: any = this.graphics.getNodeUI(newNode.id);
        newUi.position.x = fromUi.position.x + (Math.random() - 0.5);
        newUi.position.y = fromUi.position.y + (Math.random() - 0.5);
        this.graph.addLink(fromNode.id, newNode.id);
    };

    connectToAll(currentNode: any, state: string) {
        this.graph.forEachNode((node: any) => {
            if (currentNode != node && node.data.state == state && !this.isLinked(currentNode, node)) {
                this.graph.addLink(currentNode.id, node.id);
            }
        })
    }

    connectToNearest(node: any, state: string, omitNeibours?: boolean) {
        let nearestNode = this.findNearest(node, state, omitNeibours);
        if (nearestNode) {
            this.graph.addLink(node.id, nearestNode.id);
        }
    }

    breakApart(node: any, state?: string) {
        for (let i: number = 0; i < node.links.length; i++) {
            let link: any = node.links[i];
            let id: number = link.fromId == node.id ? link.toId : link.fromId;
            let neibourNode: any = this.graph.getNode(id);
            if (state ? neibourNode.data.state == state : true) {
                this.graph.removeLink(link);
                i--;
            }
        }
    }

    deleteNode(node: any) {
        this.changeNodeState(node, "", 0xffffff);
        this.nodesToDelete.push(node.id);
        this.breakApart(node);
    }

    clearTrash() {
        let deleteNextNode = () => {
            let deleteId = this.nodesToDelete.pop();
            if (deleteId) {
                this.graph.removeNode(deleteId);
            } else {
                clearInterval(interval);
            }
        }

        let interval = setInterval(() => {
            deleteNextNode();
        }, 0);
    }

    forEachNode(callback: Function): any {
        this.graph.forEachNode(callback);
    };

    setGraph(graph?: any) {
        if (graph) {
            this.graph = graph;
        } else {
            try {
                let selected:any = this.avaliableGraphs.find(graph => graph.selected);
                let params:Array<number> = selected.params.map((item:any) => parseInt(item.value));
                let result = selected.callback(...params);
                this.graph = result.graph;
                this.nextId = result.nextId;
            } catch(error) {
                console.error(error);
            }
        }
    };

    getGraph(): any {
        return this.graph;
    };

    changeSelected(value: any) {
        this.avaliableGraphs.find(item => item.selected).selected = false;
        this.avaliableGraphs.find(item => item.name == value.name).selected = true;
    };

    changeNodeState(node: any, state: string, color: number) {
        if (this.graph.getNode(node.id) && !this.nodesToDelete.includes(node.id)) {
            node.data.state = state;
            let nodeUI = this.graphics.getNodeUI(node.id);
            nodeUI.color = color;
            nodeUI.size = state == "Start" || "Stop" ? 12 : 18;
        }
    }

    render(wrapper: Node) {
        this.wrapper = wrapper;

        if (this.renderer) {
            this.renderer.dispose();
        }  

        this.graphics = VIVA_GRAPH.View.webglGraphics();    

        let layout: any = VIVA_GRAPH.Layout.forceDirected(this.graph, {
                   springLength : 50,
                   springCoeff : 0.00008,
                   dragCoeff : 0.02,
                   gravity : -1.2
                });

        var circleNode = this.buildCircleNodeShader();
        this.graphics.setNodeProgram(circleNode);

        this.graphics.node((node: any) => {
            return new WebglCircle(12, node.data.color);
        });

        this.renderer = VIVA_GRAPH.View.renderer(this.graph, {
            layout: layout,
            graphics: this.graphics,
            container: wrapper
        });

        this.renderer.run();
        
        this.pinFunction = layout.pinNode;

        this.graphics.webglInputEvents;
        this.graphics.webglInputEvents.click((node: any) => {
            let isPinMode = this.WatchableStorage.get("nodePinMode");
            setTimeout(() => {
                let nodeUI = this.graphics.getNodeUI(node.id);

                if (isPinMode) {
                    layout.pinNode(node, true);
                    nodeUI.size = 18;
                } else {
                    layout.pinNode(node, false);
                    nodeUI.size = 12;
                }
            }, 0);
        });
        this.graphics.webglInputEvents.dblClick((node: any) => {
            setTimeout(() => {
                this.graphics.getNodeUI(node.id).size = 12;
                layout.pinNode(node, false);              
            }, 0);
        });

        window.addEventListener("resize", () => { this.renderer.reset(); });
    };

    setAllNodesPin(isPin: boolean) {
        this.graph.forEachNode((node: any) => {
            let nodeUI = this.graphics.getNodeUI(node.id);
            
            if (isPin) {
                this.pinFunction(node, true);
                nodeUI.size = 18;
            } else {
                this.pinFunction(node, false);
                nodeUI.size = 12;
            }
        });
    }

    rerender() {
        if (this.wrapper) {
            this.render(this.wrapper);
        }
    };

    buildCircleNodeShader() {
        // For each primitive we need 4 attributes: x, y, color and size.
        var ATTRIBUTES_PER_PRIMITIVE = 4,
            nodesFS = [
            'precision mediump float;',
            'varying vec4 color;',

            'void main(void) {',
            '   if ((gl_PointCoord.x - 0.5) * (gl_PointCoord.x - 0.5) + (gl_PointCoord.y - 0.5) * (gl_PointCoord.y - 0.5) < 0.25) {',
            '     gl_FragColor = color;',
            '   } else {',
            '     gl_FragColor = vec4(0);',
            '   }',
            '}'].join('\n'),
            nodesVS = [
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
            '}'].join('\n');

        var program: any,
            webglUtils: any,
            gl: any,
            buffer: any,
            locations: any,
            utils: any,
            nodes = new Float32Array(64),
            nodesCount = 0,
            canvasWidth: any, canvasHeight: any, transform: any,
            isCanvasDirty: any;

        return {
            /**
             * Called by webgl renderer to load the shader into gl context.
             */
            load : function (glContext: any) {
                gl = glContext;
                webglUtils = VIVA_GRAPH.webgl(glContext);

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
            position : function (nodeUI: any, pos: any) {
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
            render : function() {
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
            updateTransform : function (newTransform: any) {
                transform = newTransform;
                isCanvasDirty = true;
            },

            /**
             * Called by webgl renderer when user resizes the canvas with nodes.
             */
            updateSize : function (newCanvasWidth: any, newCanvasHeight: any) {
                canvasWidth = newCanvasWidth;
                canvasHeight = newCanvasHeight;
                isCanvasDirty = true;
            },

            /**
             * Called by webgl renderer to notify us that the new node was created in the graph
             */
            createNode : function (node: any) {
                nodes = webglUtils.extendArray(nodes, nodesCount, ATTRIBUTES_PER_PRIMITIVE);
                nodesCount += 1;
            },

            /**
             * Called by webgl renderer to notify us that the node was removed from the graph
             */
            removeNode : function (node: any) {
                if (nodesCount > 0) { nodesCount -=1; }

                if (node.id < nodesCount && nodesCount > 0) {
                    // we do not really delete anything from the buffer.
                    // Instead we swap deleted node with the "last" node in the
                    // buffer and decrease marker of the "last" node. Gives nice O(1)
                    // performance, but make code slightly harder than it could be:
                    webglUtils.copyArrayPart(nodes, node.id*ATTRIBUTES_PER_PRIMITIVE, nodesCount*ATTRIBUTES_PER_PRIMITIVE, ATTRIBUTES_PER_PRIMITIVE);
                }
            },

            /**
             * This method is called by webgl renderer when it changes parts of its
             * buffers. We don't use it here, but it's needed by API (see the comment
             * in the removeNode() method)
             */
            replaceProperties : function(replacedNode: any, newNode: any) {},
        };
    };
};

class WebglCircle {
    private size: number;
    private color: number;
    constructor(size: number, color: number) {
        this.size = size;
        this.color = color;
    };
}