export class Blogs{
    blogsList: Post[] = []
}

export class Post{
    id!: number;
    title!: string;
    content!: string;
    createdBy!: string;
}