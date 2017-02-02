export interface IScegOption {
    layout?: string;
    otherLabel?: string;
}
export interface IScegConfig {
    path: string;
    layout: string;
    otherLabel: string;
}
export interface IScegElement {
    index: number;
    html: string;
    title: string;
    comment: string;
    category: string;
}
export interface IScegContentData {
    categories: IScegCategory[];
    contents: IScegContents;
}
export interface IScegCategory {
    name: string;
    id: string;
}
export interface IScegContents {
    [category: string]: IScegContent;
}
export interface IScegContent {
    category: IScegCategory;
    el: IScegElement[];
}