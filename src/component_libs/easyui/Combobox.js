class Combobox extends ValidateBox {
    constructor() {
        super();
        this.setEasyuiClass('combobox');

        var combobox = this;

        var changeDataKey = function(value, optKey) {
            var oldValue = this.value;
            DataOptionsItemAttribute.prototype.onValueChange.call(this, value);
            var data = this.component.dataOptions['data'];
            if (data) {
                data.forEach(function(item) {
                    item[value] = item[oldValue];
                    delete item[oldValue];
                });
            }
            this.component.getDrawable().prev().combobox('options')[optKey] = value;
        };

        [
            {name: 'textField', valueType: 'string',
                value: 'text',
                onValueChange: function(value) {
                    changeDataKey.call(this, value, 'textField');
                }
            },
            {name: 'valueField', valueType: 'string',
                value: 'value',
                onValueChange: function(value) {
                    changeDataKey.call(this, value, 'valueField');
                }
            },
            {name: 'url', valueType: 'url',
                onValueChange: function(url) {
                    DataOptionsItemAttribute.prototype.onValueChange.call(this, url);
                    this.component.getDrawable().prev().combobox('reload', url);
                }
            },
            {name: 'data',
                valueType: 'table',
                tableColumns: [
                    {field: 'text', title: 'text'},
                    {field: 'value', title: 'value'}
                ],
                onValueChange: function(value) {
                    DataOptionsItemAttribute.prototype.onValueChange.call(this, value);
                    this.component.getDrawable().prev().combobox('loadData', value);
                }
            }
        ].forEach(function(attrSpec) {
            var attr = new DataOptionsItemAttribute();
            attr.codeName = attrSpec.name;
            attr.title = attrSpec.name;
            attr.value = attrSpec.value || null;
            attr.valueType = attrSpec.valueType;
            attr.component = combobox;
            attr.onValueChange = attrSpec.onValueChange || attr.onValueChange;
            if (attr.valueType == 'table') {
                attr.tableColumns = attrSpec.tableColumns;
            }
            combobox.attributes.push(attr);
        });
    }
}
Combobox.displayName = '下拉选择框';
