class EasyuiComponent extends ElementComponent {
    constructor() {
        super();
        EasyuiComponentCommon.call(this);
    }
}

function EasyuiComponentCommon() {
    this.dataOptions = {};
    this.tagName = null;

    this.setEasyuiClass = function(c) {
        this.easyuiClass = c;
        this.classAttr.value = 'easyui-' + c;
    };

    this.getSpecialAttributeSpecs = this.getSpecialAttributeSpecs || function() {
        return [];
    };

    this.inheritComponents = function(componentClasses) {
        var me = this;
        var overriddenAttributeSpecSet = [];

        this.getSpecialAttributeSpecs().forEach(function(attrSpec) {
            overriddenAttributeSpecSet.push(attrSpec);
        });
        componentClasses.forEach(function(cls) {
            cls.prototype.getSpecialAttributeSpecs.call(me).forEach(function(attrSpec) {
                if (!overriddenAttributeSpecSet.find(function(a) { return a.name == attrSpec.name; })) {
                    attrSpec = $.extend(true, {}, attrSpec); //deep clone
                    attrSpec.component = me;
                    attrSpec.inheritComponentClass = cls;
                    overriddenAttributeSpecSet.push(attrSpec);
                }
            });
        });
        overriddenAttributeSpecSet.forEach(function(attrSpec) {
            me.attributes.push(me._makeDataOptionsItemAttribute(attrSpec));
        });
    };

    this._initAttributes = function() {
        var c = this;
        this.getSpecialAttributeSpecs().forEach(function(attrSpec) {
            attrSpec.component = c;
            c.attributes.push(c._makeDataOptionsItemAttribute(attrSpec));
        });
    };

    this._makeDataOptionsItemAttribute = function(attrSpec) {
        var attr = new DataOptionsItemAttribute();
        attr.codeName = attrSpec.name;
        attr.title = attrSpec.name;
        attr.value = attrSpec.value || null;
        attr.valueType = attrSpec.valueType;
        attr.onValueChange = function(value) {
            DataOptionsItemAttribute.prototype.onValueChange.call(this, value);
            if (attrSpec.onValueChange)
                attrSpec.onValueChange(value);
        };
        attr.inheritComponentClass = attrSpec.inheritComponentClass;
        attr.component = attrSpec.component;
        switch (attr.valueType) {
            case 'table':
                attr.tableColumns = attrSpec.tableColumns;
            case 'enum':
                attr.enumValues = attrSpec.enumValues;
        }
        return attr;
    };

    this._initAttributes();
}