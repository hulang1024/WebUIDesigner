class ValidateBox extends EasyuiComponent {
    constructor() {
        super();
        this.dataOptions = {};
        this.tag = 'input';
        this.setEasyuiClass('validatebox');
        this._initAttributes();
    }

    setEasyuiClass(c) {
        this.easyuiClass = c;
        this.classAttr.value = 'easyui-' + c;
    }

    createDrawable() {
        var span = document.createElement('span');
        var input = document.createElement('input');
        input.className = 'easyui-' + this.easyuiClass;
        span.appendChild(input);
        $.parser.parse(span);

        return span;
    }

    getDrawable() {
        return $(this._drawable).find('.textbox');
    }

    _initAttributes() {
        var validateBox = this;
        [
            {name: 'required', valueType: 'boolean'},
            {name: 'editable', valueType: 'boolean'},
            {name: 'readonly', valueType: 'boolean'},
            {name: 'value', valueType: 'string'}
        ].forEach(function(attrSpec) {
            var attr = new DataOptionsItemAttribute();
            attr.codeName = attrSpec.name;
            attr.title = attrSpec.name;
            attr.valueType = attrSpec.valueType;
            attr.component = validateBox;
            validateBox.attributes.push(attr);
        });
    }

}
ValidateBox.displayName = '验证框';
