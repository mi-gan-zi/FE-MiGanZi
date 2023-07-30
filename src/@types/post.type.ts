export interface Post {
  id: number;
  imageUrl: string;
}

export interface IPost {
  id: number;
  imageUrl: string;
}

export interface IPopular {
  address_name: string;
  content: string;
  id?: number;
  imageUrl: string;
  modifiedDate: string;
  nickname: string;
  tags: string;
  viewCount: number;
  profileImage: string;
}
