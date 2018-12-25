var StyleAttributeFactory = {};

StyleAttributeFactory.createStyleAttributes = function(component) {
    var attrSpecs = [
        {name: 'display', valueType: 'css-enum',
            enumValues: ['block', 'none', 'inline-block']},
        {name: 'position', valueType: 'css-enum',
            enumValues: ['absolute', 'relative', 'fixed', 'static', 'inherit']},
        {name: 'left'},
        {name: 'top'},
        {name: 'right'},
        {name: 'bottom'},
        {name: 'width'},
        {name: 'height'},
        {name: 'padding'},
        {name: 'margin'},
        {name: 'z-index'},
        {name: 'border'},
        {name: 'color'},
        {name: 'background'},
        {name: 'font-size'},
        {name: 'float', valueType: 'css-enum',
            enumValues: ['left', 'right', 'none', 'inherit']}
    ];
    return attrSpecs.map(function(attrSpec) {
        var attr = new StyleAttribute();
        attr.title = attrSpec.name;
        attr.codeName = attrSpec.name;
        attr.valueType = attrSpec.valueType || 'css-value';
        if (attr.valueType == 'css-enum') {
            attr.enumValues = attrSpec.enumValues;
        }
        attr.component = component;
        return attr;
    });
 }
