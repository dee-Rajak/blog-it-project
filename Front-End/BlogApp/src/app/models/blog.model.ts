export class Blog {
  Id?: number = 0;
  Title: string;
  Description: string;
  Content: string;
  CreatedDate: string;
  UpdatedDate: string;
  FeaturedImageUrl: string;
  Likes: number = 0;
  AuthorId: number;
  CategoryId: number;

  constructor(
    Title: string,
    Description: string,
    Content: string,
    FeaturedImageUrl: string,
    AuthorId: number,
    CategoryId: number
  ) {
    this.Title = Title;
    this.Description = Description;
    this.Content = Content;
    this.CreatedDate = new Date().toISOString();
    this.UpdatedDate = new Date().toISOString();
    this.FeaturedImageUrl = FeaturedImageUrl;
    this.AuthorId = AuthorId;
    this.CategoryId = CategoryId;
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