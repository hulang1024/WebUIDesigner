var AttributeInputFactory = {};

AttributeInputFactory.createAttributeInput = function(attribute) {
    var attributeSettingsPanel = this;
    switch (attribute.valueType) {
        case 'css-enum':
        case 'enum':
            return new EnumInput(attribute);
        case 'css-value':
        case 'string':
        case 'url':
            return new StringInput(attribute);
        case 'number':
            return new NumberInput(attribute);
        case 'boolean':
            return new BooleanInput(attribute);
        case 'js':
            return new JSInput(attribute);
        case 'table':
            return new TableInput(attribute);
        default:
            return null;
    }
}
