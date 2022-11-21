export class attribute {
    public id: number
    public name: string;
    public value: any;
    public constructor(id_: number,name: string, value: any) {
        this.id = id_;
        this.name = name;
        this.value = value;
    }
}