export type User = {
  id: string;
  createdAt: string;
  username: string;
  passwordHash: string;
  images: Image[];
}

export type Image = {
  id: string;
  createdAt: string;
  url: string;
  title: string;
  description: string;
  views: number;
}
