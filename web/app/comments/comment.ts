export interface IComment {
    blogKey: number;
    index: number;
    content: string;
    date: string;
    name: string;
    email: string;
    website: string;
    respondsTo: number;
    id: number;
    responses: [string];
}