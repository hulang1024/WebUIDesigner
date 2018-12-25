
class ComponentSelectPanel {
    constructor(designer) {
        this.designer = designer;
    }

    loadComponentClassTree(componentClassTree) {
        var self = this;

        $('#selectPanel #tree').tree({
            data: toTreeNodes(componentClassTree),
            onSelect: function(node) {
                if (node.componentClass) {
                    var component = new node.componentClass();
                    setTimeout(function () {
                        self.designer.placeComponent(component);
                    }, 0);
                }
            }
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
}
