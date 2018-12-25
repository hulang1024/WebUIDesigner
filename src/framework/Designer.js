class Designer {
    constructor() {
        var designer = this;
        this.componentSelectPanel = new ComponentSelectPanel(this);
        this.componentViewPanel = new ComponentViewPanel(this);
        this.attributeSettingsPanel = new AttributeSettingsPanel(this);
        this.toolbar = new Toolbar(this);
        this.topContainer = new TopContainerComponent();
        this.selectedComponent = null;



        $(document).keyup(function(event) {
            var component = designer.selectedComponent;
            if (event.keyCode == 46 && component) { //delete
                component.parent.removeChild(component);
                designer.selectedComponent = null;
                designer.attributeSettingsPanel.unsetComponent(component);
            }
        });

        $(this.topContainer.getDrawable()).click(function() {
            if (designer.selectedComponent) {
                designer.unselectComponentDrawable(designer.selectedComponent);
                designer.selectedComponent = null;
            }
        });
    }
    
    loadComponentClassTree(tree) {
        this.componentSelectPanel.loadComponentClassTree(tree);
    }

    placeComponent(component) {
        var drawable = component.createDrawable();
        this._bindEvents(component);

        var parent;
        if (this.selectedComponent && this.selectedComponent instanceof ContainerComponent) {
            parent = this.selectedComponent;
        } else {
            parent = this.topContainer;
        }

        parent.addChild(component);
        component.parent = parent;

        this.attributeSettingsPanel.addComponent(component);

        var drawableForSelect = null;
        if (component instanceof ContainerComponent) {
            drawableForSelect = component.getDrawableForSelect();
        } else {
            drawableForSelect = drawable;
        }
        this.selectComponentDrawable(drawableForSelect);
    }

    generateCodeAll() {
        return this.topContainer.generateCode(-1);
    }

    getAddedComponents() {
        return getChildren(this.topContainer);

        function getChildren(c) {
            var children = [];
            c.children.forEach(function(c) {
                children.push(c);
                if (c.children && c.children.length) {
                    getChildren(c).forEach(function(c) {
                        children.push(c);
                    });
                }
            });
            return children;
        }
    }

    _bindEvents(component) {
        var designer = this;
        (function traversal(component) {
            $(component.getDrawable()).click(function() {
                designer.selectComponentDrawable(this);
                return false;
            });
            if (component instanceof ContainerComponent) {
                component.getChildren().forEach(function(child) {
                    traversal(child);
                });
            }
        })(component);
    }

    selectComponent(component) {
        this.selectComponentDrawable(component.getDrawable());
    }

    selectComponentDrawable(drawable) {
        var component = drawable.getComponent();
        $(this.topContainer.getDrawable()).find('.component').removeClass('component-selected');
        $(drawable).addClass('component-selected');
        this.selectedComponent = component;
        this.attributeSettingsPanel.setComponent(component);
        if (component instanceof ContainerComponent) {
            this.parent = component;
        }
    }

    unselectComponentDrawable(component) {
        $(component.getDrawable()).removeClass('component-selected');
        this.attributeSettingsPanel.unsetComponent(component);
    }

}
