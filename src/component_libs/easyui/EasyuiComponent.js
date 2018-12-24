class EasyuiComponent extends ElementComponent {
    constructor() {
        super();
        this.dataOptions = {};
        this.tagName = null;

        this._initAttributes();
}

    setEasyuiClass(c) {
        this.easyuiClass = c;
        this.classAttr.value = 'easyui-' + c;
    }

    getSpecialAttributeSpecs() {
        return [];
    }

    inheritComponents(componentClasses) {
        var me = this;
        var overriddenAttributeSpecSet = {};
        componentClasses.reverse().forEach(function(cls) {
            cls.prototype.getSpecialAttributeSpecs.call(me).forEach(function(attrSpec) {
                attrSpec = $.extend(true, {}, attrSpec); //deep clone
                attrSpec.component = me;
                attrSpec.inheritComponentClass = cls;
                overriddenAttributeSpecSet[attrSpec.name] = attrSpec;
            });
        });
        Object.values(overriddenAttributeSpecSet).reverse().forEach(function(attrSpec) {
            me.attributes.push(me._makeDataOptionsItemAttribute(attrSpec));
        });
    }

    _initAttributes() {
        var c = this;
        this.getSpecialAttributeSpecs().forEach(function(attrSpec) {
            attrSpec.component = c;
            c.attributes.push(c._makeDataOptionsItemAttribute(attrSpec));
        });
    }

    _makeDataOptionsItemAttribute(attrSpec) {
        var attr = new DataOptionsItemAttribute();
        attr.codeName = attrSpec.name;
        attr.title = attrSpec.name;
        attr.value = attrSpec.value || null;
        attr.valueType = attrSpec.valueType;
        attr.onValueChange = attrSpec.onValueChange || attr.onValueChange;
        attr.inheritComponentClass = attrSpec.inheritComponentClass;
        attr.component = attrSpec.component;
        switch (attr.valueType) {
            case 'table':
                attr.tableColumns = attrSpec.tableColumns;
            case 'enum':
                attr.enumValues = attrSpec.enumValues;
        }
        return attr;
    }

    createDrawable() {
        var span = new Drawable('span', this);
        var input = document.createElement('input');
        input.className = 'easyui-' + this.easyuiClass;
        input.style.width = '100px';
        span.appendChild(input);
        $.parser.parse(span);
        this._drawable = span;
        return span;
    }

}
