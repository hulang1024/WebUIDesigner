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
                designer.attributeSettingsPanel.removeComponent(component);
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
            $(designer.topContainer.getDrawable()).find('.component').removeClass('component-selected');
            $(this).addClass('component-selected');
            designer.selectedComponent = component;
            designer.attributeSettingsPanel.setComponent(component);
            if (component instanceof ContainerComponent) {
                designer.parent = component;
            }
            return false;
        });

        component.setDrawable(drawable);

        var parent;
        if (designer.selectedComponent && designer.selectedComponent instanceof ContainerComponent) {
            parent = designer.selectedComponent;
        } else {
            parent = this.topContainer;
        }
        parent.addDrawableChild(drawable);
        parent.addChild(component);
        component.parent = parent;
        designer.attributeSettingsPanel.addComponent(component);
        drawable.click();
    }

    generateCodeAll() {
        return this.topContainer.generateCode(-1);
    }

}
