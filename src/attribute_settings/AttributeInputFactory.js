class AttributeInputFactory {
    constructor() {
    }

    createAttributeInput(attribute) {
        var attributeSettingsPanel = this;
        switch (attribute.valueType) {
            case 'css-enum':
                return new CssEnumInput(attribute);
                break;
            case 'css-value':
            case 'string':
            case 'number':
            case 'url':
                return new StringInput(attribute);
            case 'boolean':
                return new BooleanInput(attribute);
            case 'table':
                return new TableInput(attribute);
            default:
                return null;
        }
    }
}
