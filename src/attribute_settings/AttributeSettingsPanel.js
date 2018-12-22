class AttributeSettingsPanel {
    constructor(designer) {
        this.designer = designer;
        this.tabs = $('#settingsPanel').find('.easyui-tabs');
        this.cboAddedComponents = $('#addedComponents').combobox({
            onSelect: function(item) {
                designer.selectComponent(item.component);
            }
        });
        this.component = null;
    }

    addComponent(component) {
        this._reloadAddedComponentInfo();
    }

    removeComponent(component) {
        this._reloadAddedComponentInfo();
        this.cboAddedComponents.combobox('clear');
        this.tabs.tabs('tabs').forEach(function(tab) {
            tab.find('table').empty();
        });
    }

    _reloadAddedComponentInfo() {
        this.cboAddedComponents.combobox('loadData', this.designer.getAddedComponents().map(function(c, i) {
            return {text: c.constructor.displayName + ' No.' + (i+1), value: i, component: c};
        }));
    }

    setComponent(component) {
        this.component = component;

        var item = this.cboAddedComponents.combobox('getData').find(function(item) {
            return item.component == component;
        });
        this.cboAddedComponents.combobox('setValue', item.value);

        this.tabs.tabs('tabs').slice(1).forEach(function(tab) {
            tab.find('table').empty();
        });
        this._loadAttributes(component.getAttributes());
    }

    _loadAttributes(attributes) {
        var attributeSettingsPanel = this;
        var tabs = this.tabs.tabs('tabs');
        tabs.forEach(function(tab) {
            tab.find('table').empty();
        });
        var attributeInputFactory = new AttributeInputFactory();
        attributes.forEach(function(attribute) {
            // 属性标题
            var th = document.createElement('th');
            th.innerText = attribute.title;

            // 属性输入
            var td = document.createElement('td');
            td.appendChild(attributeInputFactory.createAttributeInput(attribute));

            var tr = document.createElement('tr');
            tr.appendChild(th);
            tr.appendChild(td);

            // 分组类型
            var tableIndex = 1;
            if (attribute instanceof BasicAttribute) {
                tableIndex = 0;
            }
            else if (attribute instanceof EventAttribute) {
                tableIndex = 2;
            }
            var table = tabs[tableIndex].find('table');
            table.append(tr);
        });
    }
}
