class Datagrid extends EasyuiComponent {
    constructor() {
        super();
        this.setEasyuiClass('datagrid');
    }

    createDrawable() {
        var span = document.createElement('span');
        var div = document.createElement('div');
        div.className = 'easyui-datagrid';
        div.style.width = '500px';
        div.style.height = '100px';
        span.appendChild(div);
        $.parser.parse(span);
        this._drawable = span;
        return span;
    }

    generateCode(level) {
        if (this.dataOptions['columns']) {
            this.dataOptions['columns'].forEach(function(column){
                for (var p in column) {
                    if (column[p] == '')
                        delete column[p];
                }

            });
        }
        var indent = CodeGenerate.indent(level);
        var html = indent + '<div';
        [
            this.generateIdAttributesCode(),
            generateDataOptionsCode(this.dataOptions, level + 1, 'columns'),
            this.generateStyleAttributeCode()
        ].forEach(function(s) {
            if (s && ((html.length + s.length + 4) > 80)) {
                s = '\n' + indent + '   ' + s;
            }
            html += s;
        });
        html += ' />';
        if (this.dataOptions['columns']) {
            html += '\n';
            html += CodeGenerate.indent(level + 1) + '<thead>\n';
            html += CodeGenerate.indent(level + 2) + '<tr>\n';
            var indent3 = CodeGenerate.indent(level + 3);
            this.dataOptions['columns'].forEach(function(column) {
                html += indent3 + '<th' + generateDataOptionsCode(column, level + 3, 'title', true) + '>' + column.title + '</th>\n'
            });
            html += CodeGenerate.indent(level + 2) + '</tr>\n';
            html += CodeGenerate.indent(level + 1) + '</thead>\n';
        }
        html += indent + '</div>';
        return html;
    }


    getSpecialAttributeSpecs() {
        return [
            {name: 'url', valueType: 'url'},
            {name: 'queryParams', valueType: 'js'},
            {name: 'pageSize', valueType: 'number'},
            {name: 'singleSelect', valueType: 'boolean'},
            {
                name: 'columns',
                valueType: 'table',
                tableColumns: [
                    {
                        field: 'field',
                        title: 'field',
                        editor: {
                            type: 'text',
                            options: {
                            }
                        }
                    },
                    {
                        field: 'title',
                        title: 'title',
                        editor: {
                            type: 'text',
                            options: {
                            }
                        }
                    },
                    {
                        field: 'halign',
                        title: 'halign',
                        editor: {
                            type: 'combobox',
                            options: {
                                data: ['center', 'left', 'right', ].map(function(v) {
                                    return {text: v, value: v}
                                }),
                                value: 'center',
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'align',
                        title: 'align',
                        editor: {
                            type: 'combobox',
                            options: {
                                data: ['left', 'center', 'right'].map(function(v) {
                                    return {text: v, value: v}
                                }),
                                editable: false
                            }
                        }
                    },
                    {
                        field: 'width',
                        title: 'width',
                        editor: {
                            type: 'text',
                            options: {
                            }
                        }
                    },
                    {
                        field: 'checkbox',
                        title: 'checkbox',
                        align: 'center',
                        editor: {
                            type: 'checkbox',
                            options: {
                                on: 'true',
                                off: ''
                            }
                        }
                    },
                    {
                        field: 'formatter',
                        title: 'formatter',
                        align: 'center',
                        editor: {
                            type: 'text',
                        }
                    }
                ]
            },
            {name: 'pagination', valueType: 'boolean'},
            {name: 'toolbar', valueType: 'string'}
        ];
    }

    getUpdateDrawable() {
        return $(this._drawable).find('.datagrid');
    }
}
Datagrid.displayName = 'Datagrid(数据表格)';
