Ext.define('Ext.grid.plugin.GridRenameHeaders', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.gridrenameheaders',

    id: 'gridrenameheaders',

    menuRenameHeaderText: 'Rename',
    showMenu: true,

    init: function (grid) {
        var me = this,
            headerCt;

        me.grid = grid;
        headerCt = grid.headerCt;

        me.headerCtListeners = headerCt.on({
            destroyable: true,
            scope: me,
            menucreate: me.onMenuCreate
        });

        me.gridListeners = grid.on({
            destroyable: true,
            scope: me,
            reconfigure: me.onReconfigure
        });
    },

    /**
     * @private
     * Handle creation of the grid's header menu.
     */
    onMenuCreate: function (headerCt, menu) {
        menu.on({
            beforeshow: this.onMenuBeforeShow,
            scope: this
        });
    },

    /**
     * @private
     * Handle showing of the grid's header menu.
     */
    onMenuBeforeShow: function (menu) {
        var me = this,
            menuItem, parentTable, parentTableId, columnDataIndex;

        if (me.showMenu) {
            if (!me.renameMenuItem) {
                me.renameMenuItem = {};
            }

            parentTable = menu.up('tablepanel');
            parentTableId = parentTable.id;

            menuItem = me.renameMenuItem[parentTableId];

            columnDataIndex = parentTable.headerCt.getMenu().activeHeader.dataIndex;
            if (!menuItem || menuItem.destroyed) {
                menuItem = me.createMenuItem(menu, parentTableId, columnDataIndex);
            } else {
                menuItem.columnDataIndex = columnDataIndex;
            }

            menuItem.setVisible(true);

            if (me.sep) {
                me.sep.setVisible(true);
            }
        }
    },

    createMenuItem: function (menu, parentTableId, columnDataIndex) {
        var me = this,
            item;

        // only add separator if there are other menu items
        if (menu.items.length) {
            me.sep = menu.add('-');
        }

        item = menu.add({
            itemId: 'renaming',
            text: me.menuRenameHeaderText,
            columnDataIndex: columnDataIndex,
            listeners: {
                scope: me,
                click: me.onClick
            }
        });

        return (me.renameMenuItem[parentTableId] = item);
    },

    destroy: function() {
        var me = this,
            renameMenuItem = me.renameMenuItem,
            item;

        Ext.destroy(me.headerCtListeners, me.gridListeners);

        me.bindStore(null);
        me.sep = Ext.destroy(me.sep);

        for (item in renameMenuItem) {
            renameMenuItem[item].destroy();
        }

        this.callParent();
    },


    /**
     * @private
     *
     */
    onClick: function (item, eOpts) {
        this.grid.fireEvent('renamingmenuclick', item.columnDataIndex);
    },


    /**
     * Checks the plugin's grid for statefulness.
     * @return {Boolean}
     */
    isStateful: function () {
        return this.grid.stateful;
    },

    onReconfigure: function(grid, store, columns, oldStore) {
        var me = this,
            renameMenuItem = me.renameMenuItem,
            changed = oldStore !== store,
            key;

        if (columns) {
            for (key in renameMenuItem) {
                renameMenuItem[key].setMenu(null);
            }
        }

        me.initColumns();
    }
});
