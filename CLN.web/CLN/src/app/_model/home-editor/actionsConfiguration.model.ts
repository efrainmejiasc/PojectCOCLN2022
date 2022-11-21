export class actionsConfiguration {
    public delete: boolean;
    public edit: boolean;
    public configuration: boolean;
    public background: boolean;
    public editorText: boolean;
    public typeEditorText: String;
    public editorBackground: boolean;
    public editorImage: boolean;
    public editorImageSize: boolean;
    public editorEfects: boolean;
    public editorPaginator: boolean;
    public constructor(delet: boolean, edit: boolean, configuration: boolean, background: boolean, editorText: boolean, typeEditorText: String, editorBackground: boolean, editorImage: boolean, editorEfects: boolean, editorImageSize: boolean) {
        this.delete = delet;
        this.edit = edit;
        this.configuration = configuration;
        this.background = background;
        this.editorText = editorText;
        this.typeEditorText = typeEditorText;
        this.editorBackground = editorBackground;
        this.editorImage = editorImage;
        this.editorEfects = editorEfects;
        this.editorImageSize = editorImageSize;
    }
}