import { inputInformation } from "../form-input.model";
import { University } from "../top-list/toplist-output.model";

export type SearchHistoryItem = {
    id: number; //
    inputInformation: inputInformation;
    results: University[];
}