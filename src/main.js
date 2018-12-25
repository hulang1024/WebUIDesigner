
$(function(){
    var designer = new Designer();

    var componentLibsPath = '../component_libs';
    loadjs([
        'easyui/code',
        'easyui/DataOptionsItemAttribute',
        'easyui/EasyuiComponent',
        'easyui/EasyuiContainerComponent',
        'easyui/layout/Panel',
        'easyui/layout/Tabs',
        'easyui/layout/TabPanel',
        'easyui/layout/Layout',
        'easyui/layout/RegionPanel',
        'easyui/form/FormInput',
        'easyui/form/ValidateBox',
        'easyui/form/TextBox',
        'easyui/form/Combo',
        'easyui/form/ComboBox',
        'easyui/form/NumberBox',
        'easyui/form/DateBox',
        'easyui/form/DateTimeBox',
        'easyui/form/Spinner',
        'easyui/form/NumberSpinner',
        'easyui/form/TimeSpinner',
        'easyui/form/Slider',
        'easyui/form/FileBox',
        'easyui/Datagrid',
        'my/FormTable',
        'my/FormTableTr',
        'dom/DOMComponentClassFactory',
        'dom/TextNode'
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
                            children: [
                                Panel,
                                Tabs,
                                TabPanel,
                                Layout,
                                RegionPanel
                            ]
                        },
                        {
                            text: '表单',
                            children: [
                                TextBox,
                                NumberBox,
                                ComboBox,
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

            designer.loadComponentClassTree(componentClassTree);
        }
    });
});
