class AttributeSettingsPanel {
    constructor(designer) {
        this.designer = designer;
        this.tabs = $('#settingsPanel').find('.easyui-tabs');
        this.component = null;
    }

    setComponent(component) {
        this.component = component;

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
