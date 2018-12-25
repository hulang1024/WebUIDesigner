class EasyuiContainerComponent extends ContainerComponent {
    constructor() {
        super();
        EasyuiComponentCommon.call(this);
        this.tagName = 'div';
    }

    createDrawable() {
        var span = new Drawable('span', this);
        var div = document.createElement('div');
        if (this.easyuiClass) {
            div.className = 'easyui-' + this.easyuiClass;
        }
        div.style.width = '500px';
        div.style.height = '100px';
        span.appendChild(div);
        $.parser.parse(span);
        this._drawable = span;
        return span;
    }

    generateCode(level) {
        var indent = CodeGenerate.indent(level);
        var html = indent + '<' + this.tagName;
        [
            this.generateIdAttributesCode(),
            generateDataOptionsCode(this.dataOptions, level + 1),
            this.generateStyleAttributeCode()
        ].forEach(function(s) {
            if (s && ((html.length + s.length + 4) > 80)) {
                s = '\n' + indent + '   ' + s;
            }
            html += s;
        });
        html += '>';
        if (this.children.length) {
            html += '\n';
        }
        this.children.forEach(function(c) {
            var innerHtml = c.generateCode(level + 1);
            html += innerHtml + '\n';
        });
        html += '\n' + indent + '</' + this.tagName + '>'
        return html;
    }
}