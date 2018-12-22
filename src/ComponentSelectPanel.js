
class ComponentSelectPanel {
    constructor(designer) {
        this.designer = designer;
        this.componentClasses = null;

        this.tree = $('#selectPanel #tree');
    }

    loadComponentClasses(componentClasses) {
        var self = this;
        this.componentClasses = componentClasses;
        $(this.tree).tree({
            data: componentClasses.map(function(c) {
                return {text: c.displayName, componentClass: c};
            }),
            onSelect: function(node) {
                var component = new node.componentClass();
                self.designer.placeComponent(component);
            }
        });
    }
}
