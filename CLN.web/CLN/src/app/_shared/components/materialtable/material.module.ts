import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

const MATERIALMODULES = [MatTableModule];

@NgModule({
     declarations: [],
     imports: [...MATERIALMODULES],     
     exports: [...MATERIALMODULES]
})
export class MaterialModule {}