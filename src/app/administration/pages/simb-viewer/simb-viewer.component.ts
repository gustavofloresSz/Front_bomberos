import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-simb-viewer',
  imports: [SafePipe],
  template: `
    <iframe iframe [src]="url|safe" width="100%" height="600px"></iframe>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimbViewerComponent {
  url: string = 'https://datos.siarh.gob.bo/simb/focosdecalor';
 }
