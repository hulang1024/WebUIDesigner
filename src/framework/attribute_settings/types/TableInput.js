class TableInput {
    constructor(attribute) {
        var button = document.createElement('button');
        button.innerText = '...';
        button.onclick = function() {
            var dialog = $('<div></div>').dialog({
                width: '50%',
                height: '80%',
                title: attribute.codeName,
                content: '<table id="table" class="easyui-datagrid"></table>',
                modal: true,
                buttons: [
                    {
                        text: '确定',
                        handler: function() {
                            datagrid.datagrid('endEdit', editIndex);
                            var rows = $(datagrid).datagrid('getRows').filter(function(row) {
                                for (var p in row) {
                                    if(row[p]) {
                                        return true;
                                    }
                                }
                                return false;
                            });
                            attribute.onValueChange(rows);

                            $(dialog).dialog('destroy');
                        }
                    }
                ],
                onClose: function() {
                    $(this).dialog('destroy');
                }
            });
            var editIndex = 0;
            var datagrid = dialog.find('#table');
            datagrid.datagrid({
                fit: true,
                singleSelect: true,
                columns: [attribute.tableColumns.map(function(col) {
                    col.halign = 'center';
                    col.width = Math.floor(100 / attribute.tableColumns.length) + '%';
                    col.editor = col.editor || {type: 'textbox'};
                    return col;
                })],
                onClickRow: function(index) {
                    if (editIndex == index)
                        return;
                    datagrid.datagrid('endEdit', editIndex);
                    datagrid.datagrid('selectRow', index).datagrid('beginEdit', index);
                    editIndex = index;
                }
            });
            if (attribute.value && attribute.value.length) {
                attribute.value.forEach(function(row){
                    datagrid.datagrid('appendRow', row);
                });
            }
            for (var r = 0; r < 10; r++)
                datagrid.datagrid('appendRow', {});
            datagrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
        }

        return button;
    }
}
