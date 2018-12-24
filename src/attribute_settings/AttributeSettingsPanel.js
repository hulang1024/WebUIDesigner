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

        $('#basicAttributePanel .easyui-accordion').accordion('select', 1);
    }

    addComponent(component) {
        this._reloadAddedComponentInfo();
    }

    unsetComponent(component) {
        this._reloadAddedComponentInfo();
        this.cboAddedComponents.combobox('clear');
        this.tabs.tabs('tabs').forEach(function(tab) {
            tab.find('table').empty();
        });
    }

    _reloadAddedComponentInfo() {
        this.cboAddedComponents.combobox('loadData', this.designer.getAddedComponents().map(function(c, i) {
            return {text: c.constructor.displayName + ' #' + (i+1), value: i, component: c};
        }));
    }

    setComponent(component) {
        this.component = component;

        var item = this.cboAddedComponents.combobox('getData').find(function(item) {
            return item.component == component;
        });
        this.cboAddedComponents.combobox('setValue', item.value);

        this.tabs.tabs('tabs').slice(1).forEach(function(tab) {
            var accordion = tab.find('.easyui-accordion');
            for (var i = accordion.accordion('panels').length; i > 1; i--) {
                accordion.accordion('remove', 1);
            }
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
        var inheritComponentClassAttrTableMap = {};
        attributes.forEach(function(attribute) {
            // 属性标题
            var th = document.createElement('th');
            th.innerText = attribute.title;

            // 属性输入
            var td = document.createElement('td');
            td.appendChild(AttributeInputFactory.createAttributeInput(attribute));

            var tr = document.createElement('tr');
            tr.appendChild(th);
            tr.appendChild(td);

            // 分组类型
            if (attribute instanceof BasicAttribute) {
                var table;
                if (['id', 'name', 'class', 'text'].includes(attribute.codeName)) {
                    table = tabs[0].find('table')[0];
                } else {
                    table = tabs[0].find('table')[1];
                }
                $(table).append(tr);
            } else if (attribute instanceof EventAttribute) {
                var table = tabs[2].find('table');
                table.append(tr);
            } else {
                var table;
                var inheritComponentCls = attribute.inheritComponentClass;
                if (inheritComponentCls) {
                    table = inheritComponentClassAttrTableMap[inheritComponentCls];
                    if (!table) {
                        var accordion = tabs[1].find('.easyui-accordion');
                        accordion.accordion('add', {
                        	title: '继承自 ' + inheritComponentCls.displayName,
                        	content: '<table></table>',
                        	selected: true
                        });
                        table = inheritComponentClassAttrTableMap[inheritComponentCls] = accordion.find('table')[accordion.accordion('panels').length - 1];
                    }
                } else {
                    table = tabs[1].find('table')[0];
                }

                $(table).append(tr);
            }
        });
    }
}
