import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ViewportComponent }  from '../components/viewport/viewport.component';
import { InitializationComponent }  from '../components/initialization/initialization.component';
import { AddSelectComponent } from '../components/addSelect/addSelect.component';
import { StateSelectComponent } from '../components/stateSelect/stateSelect.component';
import { MachineLoaderComponent } from '../components/machineLoader/machineLoader.component';
import { MachineSaverComponent } from '../components/machineSaver/machineSaver.component';

import { LocalizationPipe } from '../pipes/localizationPipe/localization.pipe';

import { LocalizationService } from '../services/LocalizationService/localization.service';
import { WatchableStorage }  from '../services/WatchableStorageService/watchableStorage.service';
import { GraphService } from '../services/GraphService/graph.service';
import { MachineService } from '../services/MachineService/machine.service';
import { NotificationService } from '../services/NotificationService/notification.service';
import { ColorGen } from '../services/ColorGenService/colorGen.service';
import { MachineComposerService }  from '../services/MachineComposerService/machineComposer.service';
import { MachineLoaderService } from '../services/MachineLoaderService/machineLoader.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    ViewportComponent,
    InitializationComponent,
    AddSelectComponent,
    StateSelectComponent,
    MachineLoaderComponent,
    MachineSaverComponent,
    LocalizationPipe
  ],
  providers: [
    LocalizationService,
    WatchableStorage,
    GraphService,
    MachineService,
    NotificationService,
    ColorGen,
    MachineComposerService,
    MachineLoaderService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
