export type User = {
  id: string;
  createdAt: Date;
  username: string;
  passwordHash: string;
  images: Image[];
}

export type Image = {
  id: string;
  createdAt: Date;
  url: string;
  title: string;
  description: string;
  views: number;
}
