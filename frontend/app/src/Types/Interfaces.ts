export interface CreateProps {
  model: object;
  sendObject: Function;
  selects: Array<{ string: { string: string } }>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  schema?: Indexable;
  website?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  subSchema?: Indexable;
  website?: string;
}

export interface Company {
  id: string;
  name: string;
  website: string;
  description: string;
}

export interface Indexable {
  [key: string]: string | number;
}
