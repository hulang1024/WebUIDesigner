class FormInput extends EasyuiComponent {
    constructor() {
        super();

        this.tagName = 'input';
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

    getUpdateDrawable() {
        return $(this._drawable).find('.textbox');
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
        html += ' />';
        return html;
    }
}
