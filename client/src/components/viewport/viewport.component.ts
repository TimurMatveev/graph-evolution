import { Component, OnInit } from '@angular/core';

import { WatchableStorage } from '../../services/WatchableStorageService/watchableStorage.service';
import { GraphService } from '../../services/GraphService/graph.service';

@Component({
    selector: 'viewport',
    templateUrl: './src/components/viewport/viewport.template.html',
	styleUrls: ['./src/components/viewport/viewport.template.css']
})
export class ViewportComponent implements OnInit {
    private graphHolderId: string = 'graphHolder';

    constructor(
        private GraphService: GraphService,
        private WatchableStorage: WatchableStorage,
    ) {}

    ngOnInit() {
        setTimeout(() => {
            this.GraphService.setGraph();
            this.GraphService.render(document.getElementById(this.graphHolderId));
        }, 2000)
    }
}
