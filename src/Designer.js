class Designer {
    constructor() {
        var designer = this;
        this.componentSelectPanel = new ComponentSelectPanel(this);
        this.componentViewPanel = new ComponentViewPanel(this);
        this.attributeSettingsPanel = new AttributeSettingsPanel(this);
        this.toolbar = new Toolbar(this);
        this.topContainer = new TopContainerComponent();
        this.selectedComponent = null;

        this.componentSelectPanel.load();

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

    selectComponent(component) {
        component.getDrawable().click();
    }

    placeComponent(component) {
        var designer = this;
        var drawable = component.createDrawable();
        $(drawable).addClass('component');
        $(drawable).click(function() {
            designer.selectComponentDrawable(component);
            return false;
        });

        var parent;
        if (designer.selectedComponent && designer.selectedComponent instanceof ContainerComponent) {
            parent = designer.selectedComponent;
        } else {
            parent = this.topContainer;
        }
        parent.addChild(component);
        component.parent = parent;
        designer.attributeSettingsPanel.addComponent(component);
        drawable.click();
    }

    generateCodeAll() {
        return this.topContainer.generateCode(-1);
    }

    selectComponentDrawable(component) {
        $(this.topContainer.getDrawable()).find('.component').removeClass('component-selected');
        $(component.getDrawable()).addClass('component-selected');
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
