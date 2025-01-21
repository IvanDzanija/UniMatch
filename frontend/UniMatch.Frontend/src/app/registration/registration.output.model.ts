import { NumberSymbol } from "@angular/common";
import { SavedUniversity } from "../saved-universities/saved-uni.output.model";

export type Registration = {
    id: number;
    username: string;
    email: string;
    password: string;
}
export interface User {
    id: number;
    username: string;
    email: string;
    //password: string;
    universities_saved: SavedUniversity[];
}