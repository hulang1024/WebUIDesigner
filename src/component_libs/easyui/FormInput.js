class FormInput extends EasyuiComponent {
    constructor() {
        super();

        this.tagName = 'input';
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

    getUpdateDrawable() {
        return $(this._drawable).find('.textbox');
    }
}
