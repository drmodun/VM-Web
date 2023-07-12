export interface CreateProps {
    model: object;
    sendObject : Function;
    selects: Array<{string: {string:string}}>; 
}

export interface Category {
    id: string;
    name: string;
    schema: object;
}

export interface Subcategory {
    id: string;
    name: string;
    categoryId: string;
    schema: object;
}

export interface Company {
    id: string;
    name: string;
    image: string;
}
