class ValidateBox extends ElementComponent {
    constructor() {
        super();
        this.dataOptions = {};
        this.setEasyuiClass('validatebox');
        this._initAttributes();

    }

    setEasyuiClass(c) {
        this.easyuiClass = c;
        this.classAttr.value = 'easyui-' + c;
    }

    generateCode(level) {
        var html = CodeGenerate.indent(level) + '<input';
        html += this.generateBasicAttributesCode();
        html += this._generateDataOptionsCode();
        html += ' />';
        return html;
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

    _generateDataOptionsCode() {
        var js = '';
        if (Object.keys(this.dataOptions).length) {
            var opts = [];
            for (var k in this.dataOptions) {
                var v = this.dataOptions[k];
                if (typeof v == 'string') {
                    v = String.squote(v);
                } else if (typeof v == 'object') {
                    v = this._jsonifyInDataOptions(v);
                }
                opts.push(k + ':' + v);
            }
            js += ' data-options="' + opts.join(',') + '"';
        }
        if (js.length > 40) {
            js = '\n  ' + js;
        }
        return js;
    }

    _jsonifyInDataOptions(o) {
        return jsonify(o);
        // 非严格json，属性名不要引号
        function jsonify(o) {
            var s = '';
            if (o.constructor == Array) {
                s += '[';
                o.forEach(function(item, i) {
                    s += jsonify(item);
                    if (i < o.length - 1) {
                        s += ',';
                    }
                });
                s += ']';
            } else if (o.constructor == Object) {
                s += '{';
                var pCount = Object.keys(o).length, i = 0;
                for (var p in o) {
                    s += p + ':' + jsonify(o[p]);
                    if (i++ < pCount - 1)
                        s += ',';
                }
                s += '}';
            } else if (o.constructor == String) {
                return String.squote(o);
            } else {
                return o;
            }
            return s;
        }
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
