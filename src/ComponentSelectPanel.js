
class ComponentSelectPanel {
    constructor(designer) {
        this.designer = designer;
    }

    load() {
        var self = this;

        this._loadComponentClassTree(function(componentClassTree) {
            $('#selectPanel #tree').tree({
                data: toTreeNodes(componentClassTree),
                onSelect: function(node) {
                    var component = new node.componentClass();
                    setTimeout(function() {
                        self.designer.placeComponent(component);
                    }, 0);
                }
            });
        });


        function toTreeNodes(children) {
            return children.map(function(node) {
                if (node.text) {
                    node.children = toTreeNodes(node.children);
                    return node;
                } else {
                    var c = node;
                    return {text: c.displayName, iconCls: 'icon-blank', componentClass: c};
                }
            });
        }
    }

    _loadComponentClassTree(onLoad) {
        var componentLibsPath = 'component_libs';
        loadjs([
            'dom/DOMComponentClassFactory',
            'dom/TextNode',
            'easyui/code',
            'easyui/DataOptionsItemAttribute',
            'easyui/EasyuiComponent',
            'easyui/FormInput',
            'easyui/ValidateBox',
            'easyui/TextBox',
            'easyui/Combo',
            'easyui/ComboBox',
            'easyui/NumberBox',
            'easyui/DateBox',
            'easyui/DateTimeBox',
            'easyui/Spinner',
            'easyui/NumberSpinner',
            'easyui/TimeSpinner',
            'easyui/Slider',
            'easyui/FileBox',
            'easyui/Datagrid',
            'my/FormTable',
            'my/FormTableTr'
        ].map(function(fileName) {
            return componentLibsPath + '/' + fileName + '.js'
        }), {
            async: false,
            success: function() {
                var componentClassTree = [
                    {
                        text: 'My',
                        children: [
                            FormTable,
                            FormTableTr
                        ]
                    },
                    {
                        text: 'Easyui',
                        children: [
                            {
                                text: '布局',
                                children: []
                            },
                            {
                                text: '表单',
                                children: [
                                    TextBox,
                                    ComboBox,
                                    NumberBox,
                                    DateBox,
                                    DateTimeBox,
                                    NumberSpinner,
                                    TimeSpinner,
                                    Slider,
                                    FileBox
                                ]
                            },
                            {
                                text: '数据表格',
                                children: [
                                    Datagrid
                                ]
                            }
                        ]
                    },
                    {
                        text: 'DOM',
                        children: [
                            TextNode
                        ].concat(DOMComponentClassFactory.createClasses())
                    }
                ];

                onLoad(componentClassTree);
            }
        });
    }
}
