class Designer {
    constructor() {
        var designer = this;
        this.componentSelectPanel = new ComponentSelectPanel(this);
        this.componentViewPanel = new ComponentViewPanel(this);
        this.attributeSettingsPanel = new AttributeSettingsPanel(this);
        this.toolbar = new Toolbar(this);
        this.topContainer = new TopContainerComponent();
        this.selectedComponent = null;
        this.addedComponents = [];

        $(document).keyup(function(event) {
            if (event.keyCode == 46 && designer.selectedComponent) { //delete
                designer.selectedComponent.parent.removeChild(designer.selectedComponent);
                designer.selectedComponent = null;
            }
        });
    }

    getAddedComponents() {
        return this.addedComponents;
    }

    selectComponent(component) {
        component.getDrawable().click();
    }

    configureComponents(componentClasses) {
        this.componentSelectPanel.loadComponentClasses(componentClasses);
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
        this.addedComponents.push(component);
        designer.attributeSettingsPanel.addComponent(component);
        drawable.click();
    }

    generateCodeAll() {
        return this.topContainer.generateCode(-1);
    }

}
