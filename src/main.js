

$(function(){
    var designer = new Designer();
    var componentLibsPath = 'component_libs';

    loadjs([
        'dom/DOMComponentClassFactory',
        'dom/TextNode',
        'easyui/DataOptionsItemAttribute',
        'easyui/ValidateBox',
        'easyui/TextBox',
        'easyui/Combobox'
    ].map(function(fileName) {
        return componentLibsPath + '/' + fileName + '.js'
    }), {
        success: function() {
            var componentClasses = [
                TextNode,
                TextBox,
                Combobox
            ];
            componentClasses = componentClasses.concat(new DOMComponentClassFactory().createClasses());
            designer.configureComponents(componentClasses);
        }
    });


});
