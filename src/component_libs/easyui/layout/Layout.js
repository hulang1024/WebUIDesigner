class Layout extends EasyuiContainerComponent {
    constructor() {
        super();
        this.setEasyuiClass('layout');
        this.inheritComponents([Panel]);
        this.layout = null;
    }

    addChild(child) {
        if (!(child instanceof RegionPanel)) {
            return;
        }
        this.children.push(child);
        var layout = this.layout;
        layout.layout('add', {
            title: '&nbsp;',
            region: 'center',
            content: '<div></div>'
        });
        var panel = layout.layout('panel' , 'center');
        child.setPanel(panel);
    }

    createDrawable() {
        var drawable = new Drawable('div', this);
        var div = document.createElement('div');
        if (this.easyuiClass) {
            div.className = 'easyui-layout';
        }
        drawable.style.width = '500px';
        drawable.style.height = '200px';
        div.setAttribute('data-options', 'fit:true');
        drawable.appendChild(div);
        $.parser.parse(drawable);
        this._drawable = drawable;
        this.layout = $(drawable).find('.easyui-layout');
        return drawable;
    }
}
Layout.displayName = 'Layout(布局)';
