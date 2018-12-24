class ComboBox extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('combobox');
        this.inheritComponents([Combo, ValidateBox]);
    }

    getSpecialAttributeSpecs() {
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

        return [
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
            {name: 'queryParams', valueType: 'js'},
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
        ];
    }
}
ComboBox.displayName = 'ComboBox(下拉列表框)';
