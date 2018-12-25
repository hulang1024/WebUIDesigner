class TabPanel extends EasyuiContainerComponent {
    constructor() {
        super();
        this.inheritComponents([Panel]);
        this._tab = null;
    }

    setTab(tab) {
        this._tab = tab;
    }

    addChild(child) {
        this.children.push(child);
        this._tab.panel('body').append(child.getDrawable());
    }

    getSpecialAttributeSpecs() {
        var self = this;
        return [
            {
                name: 'title',
                valueType: 'string',
                onValueChange: function(value) {
                    self.parent.tabs.tabs('update', {
                        tab: self._tab,
                        options: {
                            title: value
                        }
                    });
                }
            },
            {name: 'closable', valueType: 'boolean'},
            {name: 'selected', valueType: 'boolean'}
        ];
    }
}
TabPanel.displayName = 'TabPanel(选项卡面板)';
