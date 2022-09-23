import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '@gamedex/shared/models';
import { Platform } from '@gamedex/shared/platform';
import { Publisher } from '@gamedex/shared/publisher';
import { Store } from '@gamedex/shared/store';
import { errorImage, removeDiacritics, sliceText } from '@gamedex/shared/utils/functions';


@Component({
  selector: 'gamedex-common-card',
  template:`
  <ion-card class="ion-activatable ripple-parent common-card"
    [ngStyle]="{'background-image': 'url(' + getImage + ')'}"
    (click)="redirectTo()"
    >

    <div class="common-item displays-around" >
      <div class="common-item-title displays-center" >
        <div class="span-text text-color-light span-bold">{{ item?.name }}</div>
      </div>
    </div>

    <!-- RIPLE EFFECT  -->
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
  `,
  styleUrls: ['./common-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonCardComponent {

  sliceText = sliceText;
  errorImage = errorImage;
  removeDiacritics = removeDiacritics;
  @Input() item: (Store | Game | Platform | Publisher); //any;
  @Input() hash: string;


  constructor(
    private router: Router
  ) { }


  get getImage(): string {
    return (this.item as any)?.image_background || (this.item as any)?.background_image || '';
  }

  get hashFormat(): string {
    return this.hash?.slice(0, -1);
  }

  redirectTo(): void {
    if(!this.hash) return;
    this.router.navigate(['/'+this.hashFormat+'/'+this.item?.id],{queryParams:{name:(removeDiacritics(this.item?.name) || this.item?.id)}})
  }

}
