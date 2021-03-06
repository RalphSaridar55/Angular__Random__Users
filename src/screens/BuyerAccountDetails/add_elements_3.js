export let addElements3 = [
    {
        type:'picker',
        label:'Variant Type',
        items:'variant_type_list',
        stateValue:'variant_type',
    },
    {
        type:'select',
        label:'Variant Value',
        items:'variant_value_list',
        stateValue:'variant_value',
        placeholder:'Variant Value'
    },
    {
        type: 'switchInput',
        label: 'Variant Stock Qty',
        placeholder:'Quantity',
        stateValue: 'variant_stock_qty_switch',
        valueValue:'variant_stock_qty',
        returnKeyType: 'next',
        stateError: 'variant_stock_qty_error',
        keyBoardType:"numeric",
    },
    {
        type: 'switchInput',
        label: 'Variant Piece Qty',
        placeholder:'Quantity',
        stateValue: 'variant_piece_qty_switch',
        valueValue:'variant_piece_qty',
        returnKeyType: 'next',
        stateError: 'variant_piece_qty_error',
        keyBoardType:"numeric",
    },
    {
        type: 'switchInput',
        label: 'Variant Package Qty',
        placeholder:'Quantity',
        stateValue: 'variant_package_qty_switch',
        valueValue:'variant_package_qty',
        returnKeyType: 'next',
        stateError: 'variant_package_qty_error',
        keyBoardType:"numeric",
    },
    {
        type: 'switchInput',
        label: 'Variant Minimum Quantity',
        placeholder:'Quantity',
        stateValue: 'variant_minqty_switch',
        valueValue:'variant_minqty',
        returnKeyType: 'next',
        stateError: 'variant_minqty_error',
        keyBoardType:"numeric",
    },
    {
        type: 'switchInput',
        label: 'Variant Discount',
        placeholder:'Discount',
        stateValue: 'variant_discount_switch',
        valueValue:'variant_discount',
        returnKeyType: 'next',
        stateError: 'variant_discount_error',
        keyBoardType:"numeric",
    }, 
    {
        type: 'Date',
        label: 'Start Date',
        stateValue: 'startdate',
    },
    /* {
        type: 'switchInput',
        label: 'Variant Discount',
        placeholder:'Quantity',
        stateValue: 'variant_discount_switch',
        valueValue:'variant_discount',
        returnKeyType: 'next',
        stateError: 'variant_discount_error',
        keyBoardType:"numeric",
    }, */
    {
        type:'button'
    }
]