
class TopContainerComponent extends ContainerComponent {
    constructor() {
        super();
        var div = document.createElement('div');
        div.style.margin = '10px';
        $('#viewPanel').append(div);
        this._drawable = div;
    }

    addDrawableChild(child) {
        this._drawable.append(child);
    }

    generateCode(level) {
        var code = '';
        this.children.forEach(function(c) {
            code += c.generateCode(level + 1) + '\n';
        });
        return code;
    }

}
