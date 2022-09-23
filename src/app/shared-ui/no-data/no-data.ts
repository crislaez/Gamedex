import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gamedex-no-data',
  template:`
    <div class="error-serve" [ngStyle]="{'margin-top': top}">
      <div>
        <span>
          <img [src]="image"/>
        </span>
        <br>
        <span class="text-color-ligth">{{title | translate}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./no-data.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoDataComponent {

  @Input() top = '2vh';
  @Input() title: string;
  @Input() image: string;



  constructor() { }


}
