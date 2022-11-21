import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { ContenidosTituloComponent } from '../../components/contenidos-titulo/contenidos-titulo.component';

// Pipes
import { ConteoCaracteresPipe } from 'src/app/_shared/pipes/conteo-caracteres.pipe';
import { VideoPipe } from '../../pipes/video.pipe';
import { UrlifyPipe } from '../../pipes/urlify.pipe';
import { ConteoCaracteresQuillPipe } from '../../pipes/conteo-caracteres-quill.pipe';
import { ExtensionArchivoPipe } from '../../pipes/extension-archivo.pipe';
import { SafePipePipe } from '../../pipes/safe-pipe.pipe';
import { SafeHtmlPipe } from '../../pipes/SafeHtmlPipe.pipe';


@NgModule({
  declarations: [
    SafeHtmlPipe,
    SafePipePipe,
    VideoPipe,
    UrlifyPipe,
    ConteoCaracteresPipe,
    ConteoCaracteresQuillPipe,
    AlertModalComponent,
    ConfirmationModalComponent,
    ContenidosTituloComponent,
    ExtensionArchivoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeHtmlPipe,
    SafePipePipe,
    VideoPipe,
    UrlifyPipe,
    ConteoCaracteresPipe,
    ConteoCaracteresQuillPipe,
    AlertModalComponent,
    ConfirmationModalComponent,
    ContenidosTituloComponent,
    ExtensionArchivoPipe,
  ]
})
export class SharedModuleModule { }
