export interface ImageItem {
  did: string;
  imageLink: string;
  commitRkey: string;
  text: string;
}

export enum PostLinkOptions {
  Post,
  Image,
}
