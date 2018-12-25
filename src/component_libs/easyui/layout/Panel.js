class Panel extends EasyuiContainerComponent {
    constructor() {
        super();
        this.setEasyuiClass('panel');
    }

    addChild(child) {
        this.children.push(child);
        $(this.getDrawable()).find('.panel-body').append($(child.getDrawable()).find('.panel'));
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'title', valueType: 'string'},
            {name: 'iconCls', valueType: 'string'},
            {name: 'headerCls', valueType: 'string'},
            {name: 'headerCls', valueType: 'string'},
            {name: 'bodyCls', valueType: 'string'},
            {name: 'style', valueType: 'js'},
            {name: 'fit', valueType: 'boolean'},
            {name: 'collapsible', valueType: 'boolean'},
            {name: 'minimizable', valueType: 'boolean'},
            {name: 'maximizable', valueType: 'boolean'},
            {name: 'closable', valueType: 'boolean'},
            {name: 'tools', valueType: 'js'},
            {name: 'collapsed', valueType: 'boolean'},
            {name: 'minimized', valueType: 'boolean'},
            {name: 'maximized', valueType: 'boolean'},
            {name: 'closed', valueType: 'boolean'},
            {name: 'href', valueType: 'url'}
        ];
    }
}
Panel.displayName = 'Panel(面板)';
