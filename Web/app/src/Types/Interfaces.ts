export interface CreateProps {
    model: object;
    sendObject : Function;
    selects: Array<{string: {string:string}}>; 
}

export interface Category {
    id: string;
    name: string;
    description: string;
    schema: Indexable;
}

export interface Subcategory {
    id: string;
    name: string;
    categoryId: string;
    subSchema: Indexable;
}

export interface Company {
    id: string;
    name: string;
    logo: string;
    website: string;
    description: string;
}

export interface Indexable{
    [key: string]: string | number;
}
