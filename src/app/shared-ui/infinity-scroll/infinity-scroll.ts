import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityStatus } from '@gamedex/shared/models';


@Component({
  selector: 'gamedex-infinity-scroll',
  template:`
    <ng-container *ngIf="slice < total">
      <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
        <ion-infinite-scroll-content class="loadingspinner">
          <gamedex-spinner [top]="'0%'" *ngIf="$any(status) === 'pending'"></gamedex-spinner>
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ng-container>
  `,
  styleUrls: ['./infinity-scroll.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfinityScrollComponent {

  @Input() slice: number;
  @Input() status: EntityStatus;
  @Input() total: number;
  @Output() loadDataTrigger = new EventEmitter<{event, total}>();


  constructor() { }


  // ngOnChanges(): void{
  //   console.log('slice => ',this.slice)
  //   console.log('total => ',this.total)
  // }

  loadData(event, total): void{
    this.loadDataTrigger.next({event, total})
  }

}
