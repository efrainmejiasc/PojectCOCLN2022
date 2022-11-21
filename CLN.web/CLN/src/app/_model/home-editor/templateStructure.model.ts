import { attribute } from "./attribute.model";

export class templateStructure {
    public id: number;
    public name: string;
    public idState: number;
    public state: string;
    public idTemplate: number;
    public attributes: attribute[] = [];
}