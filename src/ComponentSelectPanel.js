
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
                    self.designer.placeComponent(component);
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
            'easyui/DataOptionsItemAttribute',
            'easyui/EasyuiComponent',
            'easyui/ValidateBox',
            'easyui/TextBox',
            'easyui/Combobox'
        ].map(function(fileName) {
            return componentLibsPath + '/' + fileName + '.js'
        }), {
            async: false,
            success: function() {
                var componentClassTree = [
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
                                    Combobox
                                ]
                            }
                        ]
                    },
                    {
                        text: 'DOM',
                        children: [
                            TextNode
                        ].concat(new DOMComponentClassFactory().createClasses())
                    }
                ];

                onLoad(componentClassTree);
            }
        });
    }
}
