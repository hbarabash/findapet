export interface Recipe {
  title: string;
  image: string;
  spoonacularSourceUrl: string;
  id: number;
}
export interface RecipeList {
  recipes: Recipe[];
}

export interface RecipeSearchResult {
  title: string;
  image: string;
  id: number;
}

export interface RecipeSearchList {
  results: RecipeSearchResult[] | undefined;
  totalResults: number;
}

export interface RecipeById {
  summary: string;
}

export interface breed {
  name: string;
}

export interface BreedList {
  breeds: breed[];
}
