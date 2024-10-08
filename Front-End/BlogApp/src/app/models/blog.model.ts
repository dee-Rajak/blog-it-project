export class Blog {
  id: number = 0;
  title: string;
  description: string;
  content: string;
  createdDate: string;
  updatedDate: string;
  featuredImageUrl: string;
  likes: number = 0;
  authorId: number;
  categoryId: number;

  constructor(
    title: string,
    description: string,
    content: string,
    featuredImageUrl: string,
    authorId: number,
    categoryId: number
  ) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.createdDate = new Date().toISOString();
    this.updatedDate = new Date().toISOString();
    this.featuredImageUrl = featuredImageUrl;
    this.authorId = authorId;
    this.categoryId = categoryId;
  }
}

export interface BlogData {
  Id: number;
  Title: string;
  Description: string;
  Content: string;
  CreatedDate: string;
  UpdatedDate: string;
  Likes: number;
  FeaturedImageUrl: string;
  AuthorId: number;
  AuthorName?: string;
  CategoryId: number;
}
