export class PropertyPickerNodeModel {
    root: boolean;
    text: string;
    originalText: string;
    expanded: boolean;
    isNavigable: boolean;
    isPropertyCodeChecked: boolean;
    isPropertyTextChecked: boolean;
    showCode: boolean;
    showDescription: boolean;
    publicPath: string;
    children: PropertyPickerNodeModel[];

    public constructor(
        fields?: {
            root?: boolean,
            text?: string,
            originalText?: string,
            expanded?: boolean,
            isNavigable?: boolean,
            isPropertyCodeChecked?: boolean,
            isPropertyTextChecked?: boolean,
            showCode?: boolean,
            showDescription?: boolean,
            publicPath?: string,
            children?: PropertyPickerNodeModel[]
        }) {

        this.root = false;
        this.text = this.originalText;
        this.showCode = true;
        this.showDescription = true;

        if (fields) {
          Object.assign(this, fields);
        }
    }
}
