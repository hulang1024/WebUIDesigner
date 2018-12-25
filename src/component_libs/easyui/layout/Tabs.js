class Tabs extends EasyuiContainerComponent {
    constructor() {
        super();
        this.setEasyuiClass('tabs');
        this.inheritComponents([Panel]);
        this.tabs = null;
    }

    addChild(child) {
        if (!(child instanceof TabPanel)) {
            return;
        }
        this.children.push(child);
        var tabs = this.tabs;
        tabs.tabs('add', {
            title: '&nbsp;',
            content: '<div></div>',
        });
        var tab = tabs.tabs('getSelected');
        child.setTab(tab);
    }

    createDrawable() {
        var drawable = new Drawable('div', this);
        var div = document.createElement('div');
        if (this.easyuiClass) {
            div.className = 'easyui-tabs';
        }
        drawable.style.width = '500px';
        drawable.style.height = '200px';
        div.setAttribute('data-options', 'fit:true');
        drawable.appendChild(div);
        $.parser.parse(drawable);
        this._drawable = drawable;
        this.tabs = $(drawable).find('.easyui-tabs');
        return drawable;
    }
}
Tabs.displayName = 'Tabs(选项卡)';
