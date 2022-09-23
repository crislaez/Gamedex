import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gamedex-spinner',
  template:`
    <div [style]="{'margin-top':top}"  class="loadingspinner"></div>
  `,
  styleUrls: ['./spinner.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {

  @Input() top:string = '65%';


  constructor() { }


}
