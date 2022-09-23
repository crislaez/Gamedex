import { IonContent } from "@ionic/angular";
import { SwiperOptions } from "swiper";

export const trackByFn = (_: number, item: any): number => {
  return item?.id ?? item;
}

export const errorImage = (event): void => {
  event.target.src = '../../../../assets/images/image_not_found.png';
}

export const isNotemptyObject = (object: any): boolean => {
  return Object.keys(object || {})?.length > 0
}

export const getObjectKeys = (obj: any): any => {
  return Object.keys(obj || {})
}

export const gotToTop = (content: IonContent): void => {
  content?.scrollToTop(500);
}

export const sliceText = (text: string, slice: number) => {
  return text?.length > slice ? text?.slice(0, slice) + '...' : text;
}

export const getImage = (id) => {
  return `assets/images/${id}.jpg`;
}

export const itemNameFormat = (item): string => {
  return item?.replace(/ /g,'-')
}

export const getSliderConfig = (info:any): SwiperOptions => {
  return {
    slidesPerView: info?.length > 1 ? 2 : 1,
    spaceBetween: 20,
    // freeMode: true,
    pagination:{ clickable: true },
    lazy: true,
    preloadImages: false
  };
}

export const orderArray = (list: string[]) => {
  return [...list]?.sort((a,b) => {
    if(a > b) return 1;
    if(b < a) return 0;
    return -1;
  })
}

export const replaceLowBar = (text:string) => {
  if(typeof text !== 'string') return
  return text?.replace(/_/g,' ') || '';
}

export const removeDiacritics = (text) => {
  return text?.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

export const redirectToDomain = (url) => {
  if(!url) return;
  window.location.href = 'www.' + url;
}




