class RegionPanel extends EasyuiContainerComponent {
    constructor() {
        super();
        this.inheritComponents([Panel]);
        this._panel = null;
    }

    setPanel(panel) {
        this._panel = panel;
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'title', valueType: 'string'},
            {name: 'region', valueType: 'enum', enumValues: 'north,south,east,west,center'.split(',')}
        ];
    }
}
RegionPanel.displayName = 'RegionPanel(区域面板)';
