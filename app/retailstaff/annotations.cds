using LoyaltyService as service from '../../srv/service';


// =============================================================
// TRANSACTIONS
// =============================================================

annotate service.Transactions with @(

    // ---------------------------------------------------------
    // Entity Label
    // ---------------------------------------------------------

    Common.Label : 'Transaction',


    // ---------------------------------------------------------
    // Header Information
    // ---------------------------------------------------------

    UI.HeaderInfo : {
        $Type : 'UI.HeaderInfoType',

        TypeName : 'Transaction',

        TypeNamePlural : 'Transactions',

        Title : {
            $Type : 'UI.DataField',
            Value : txnID
        },

        Description : {
            $Type : 'UI.DataField',
            Value : channel
        }
    },


    // ---------------------------------------------------------
    // Object Page - General Information
    // ---------------------------------------------------------

    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',

        Data : [

            {
                $Type : 'UI.DataField',
                Label : 'Customer',
                Value : customer_customerID
            },

            {
                $Type : 'UI.DataField',
                Label : 'Channel',
                Value : channel
            },

            {
                $Type : 'UI.DataField',
                Label : 'Amount',
                Value : amount
            },

            {
                $Type : 'UI.DataField',
                Label : 'Transaction Date',
                Value : txnDate
            },

            {
                $Type : 'UI.DataField',
                Label : 'Points Earned',
                Value : pointsEarned
            }
        ]
    },


    // ---------------------------------------------------------
    // Object Page - Facet
    // ---------------------------------------------------------

    UI.Facets : [

        {
            $Type : 'UI.ReferenceFacet',

            ID : 'GeneralInformationFacet',

            Label : 'General Information',

            Target : '@UI.FieldGroup#GeneralInformation'
        }
    ],


    // ---------------------------------------------------------
    // List Report
    // ---------------------------------------------------------

    UI.LineItem : [

        {
            $Type : 'UI.DataField',

            Label : 'Customer',

            Value : customer.name
        },

        {
            $Type : 'UI.DataField',

            Label : 'Channel',

            Value : channel
        },

        {
            $Type : 'UI.DataField',

            Label : 'Amount',

            Value : amount
        },

        {
            $Type : 'UI.DataField',

            Label : 'Transaction Date',

            Value : txnDate
        },

        {
            $Type : 'UI.DataField',

            Label : 'Points Earned',

            Value : pointsEarned
        }
    ]
);


// =============================================================
// CUSTOMER VALUE HELP
// =============================================================

annotate service.Transactions with {

    customer @Common.ValueList : {

        $Type : 'Common.ValueListType',

        CollectionPath : 'Customers',

        Parameters : [

            {
                $Type : 'Common.ValueListParameterInOut',

                LocalDataProperty : customer_customerID,

                ValueListProperty : 'customerID'
            },

            {
                $Type : 'Common.ValueListParameterDisplayOnly',

                ValueListProperty : 'name'
            },

            {
                $Type : 'Common.ValueListParameterDisplayOnly',

                ValueListProperty : 'email'
            },

            {
                $Type : 'Common.ValueListParameterDisplayOnly',

                ValueListProperty : 'totalPoints'
            },

            {
                $Type : 'Common.ValueListParameterDisplayOnly',

                ValueListProperty : 'tier'
            }
        ]
    }
};


// =============================================================
// CHANNEL DROPDOWN (Fixed Values)
// =============================================================

// =============================================================
// CHANNEL VALUE HELP (Fixed Dropdown)
// =============================================================

annotate service.Transactions with {

    channel @(
        Common.Label : 'Channel',

        Common.ValueListWithFixedValues : true,

        Common.ValueList : {
            $Type : 'Common.ValueListType',

            CollectionPath : 'ChannelCodes',

            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',

                    LocalDataProperty : channel,

                    ValueListProperty : 'code'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',

                    ValueListProperty : 'name'
                }
            ]
        }
    )
};


// =============================================================
// READ-ONLY FIELDS
// =============================================================

annotate service.Transactions with {

    txnID        @Common.FieldControl : #ReadOnly;

    pointsEarned @Common.FieldControl : #ReadOnly;

};