import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ColorPickerModule } from 'ngx-color-picker';

import { SharedModuleModule } from '../shared-module/shared-module.module';

import { PlantillaCuatroComponent } from 'src/app/_pages/home-editor/templates/plantilla-cuatro/plantilla-cuatro.component';
import { PlantillaUnoComponent } from 'src/app/_pages/home-editor/templates/plantilla-uno/plantilla-uno.component';
import { PlantillaTresComponent } from 'src/app/_pages/home-editor/templates/plantilla-tres/plantilla-tres.component';
import { PlantillaDosComponent } from 'src/app/_pages/home-editor/templates/plantilla-dos/plantilla-dos.component';
import { PlantillaCincoComponent } from 'src/app/_pages/home-editor/templates/plantilla-cinco/plantilla-cinco.component';
import { ActionAttributeComponent } from 'src/app/_pages/home-editor/templates/action-attribute/action-attribute.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule,
    QuillModule.forRoot(),
    ColorPickerModule
  ],
  declarations: [
    ActionAttributeComponent,
    PlantillaUnoComponent,
    PlantillaDosComponent,
    PlantillaTresComponent,
    PlantillaCuatroComponent,
    PlantillaCincoComponent
  ],
  exports: [
    ActionAttributeComponent,
    PlantillaUnoComponent,
    PlantillaDosComponent,
    PlantillaTresComponent,
    PlantillaCuatroComponent,
    PlantillaCincoComponent
  ]
})
export class PlantillasModule { }
