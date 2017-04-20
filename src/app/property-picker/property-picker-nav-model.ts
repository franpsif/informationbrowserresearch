import { PropertyPickerNodeModel} from './property-picker-node-model';

export class PropertyPickerNavModel {
    property: PropertyPickerNodeModel;
    index: number;

    public constructor(
        fields?: {
            property?: PropertyPickerNodeModel,
            index?: number
        }) {

        if (fields) {
          Object.assign(this, fields);
        }
    }
}
