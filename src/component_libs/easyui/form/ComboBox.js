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
            var data = this.component.dataOptions['data'];
            if (data) {
                data.forEach(function(item) {
                    item[value] = item[oldValue];
                    delete item[oldValue];
                });
            }
            this.component.getUpdateDrawable().prev().combobox('options')[optKey] = value;
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
                    this.component.getUpdateDrawable().prev().combobox('reload', url);
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
                    this.component.getUpdateDrawable().prev().combobox('loadData', value);
                }
            }
        ];
    }
}
ComboBox.displayName = 'ComboBox(下拉列表框)';
