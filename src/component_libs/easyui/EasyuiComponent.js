class EasyuiComponent extends ElementComponent {
    constructor() {
        super();
        this.dataOptions = {};
        this.tag = null;
    }

    setEasyuiClass(c) {
        this.easyuiClass = c;
        this.classAttr.value = 'easyui-' + c;
    }

    generateCode(level) {
        var indent = CodeGenerate.indent(level);
        var html = indent + '<' + this.tag;
        [
            this.generateIdAttributesCode(),
            this._generateDataOptionsCode(),
            this.generateStyleAttributeCode()
        ].forEach(function(s) {
            if (s && ((html.length + s.length + 4) > 80)) {
                s = '\n' + indent + CodeGenerate.indent(1) + s;
            }
            html += s;
        });
        html += ' />';
        return html;
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

}
