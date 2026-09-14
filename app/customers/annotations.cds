using LoyaltyService as service from '../../srv/service';


// =============================================================
// CUSTOMER
// =============================================================

annotate service.Customers with @(

    // =========================================================
    // LABEL
    // =========================================================

    Common.Label : 'Customer',


    // =========================================================
    // OBJECT PAGE HEADER
    // =========================================================

    UI.HeaderInfo : {
        $Type : 'UI.HeaderInfoType',

        TypeName : 'Customer',

        TypeNamePlural : 'Customers',

        Title : {
            $Type : 'UI.DataField',
            Value : name
        },

        Description : {
            $Type : 'UI.DataField',
            Value : email
        }
    },


    // =========================================================
    // GENERAL INFORMATION
    // =========================================================

    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',

        Data : [

            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name
            },

            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : email
            },

            {
                $Type : 'UI.DataField',
                Label : 'Total Points',
                Value : totalPoints
            },

            {
                $Type : 'UI.DataField',
                Label : 'Tier',
                Value : tier
            }
        ]
    },


    // =========================================================
    // CUSTOMER OBJECT PAGE FACETS
    // =========================================================

    UI.Facets : [

        // -----------------------------------------------------
        // General Information
        // -----------------------------------------------------

        {
            $Type : 'UI.ReferenceFacet',

            ID : 'GeneralInformationFacet',

            Label : 'General Information',

            Target : '@UI.FieldGroup#GeneralInformation'
        },


        // -----------------------------------------------------
        // Purchase History
        // -----------------------------------------------------

        {
            $Type : 'UI.ReferenceFacet',

            ID : 'TransactionsFacet',

            Label : 'Purchase History',

            Target : 'transactions/@UI.LineItem'
        },


        // -----------------------------------------------------
        // Redemption History
        // -----------------------------------------------------

        {
            $Type : 'UI.ReferenceFacet',

            ID : 'RedemptionsFacet',

            Label : 'Redemption History',

            Target : 'redemptions/@UI.LineItem'
        }
    ],


    // =========================================================
    // CUSTOMER LIST REPORT
    // =========================================================

    UI.LineItem : [

        {
            $Type : 'UI.DataField',

            Label : 'Name',

            Value : name
        },

        {
            $Type : 'UI.DataField',

            Label : 'Email',

            Value : email
        },

        {
            $Type : 'UI.DataField',

            Label : 'Total Points',

            Value : totalPoints
        },

        {
            $Type : 'UI.DataField',

            Label : 'Tier',

            Value : tier
        }
    ]
);


// =============================================================
// CUSTOMER READ-ONLY FIELDS
// =============================================================

annotate service.Customers with {

    customerID @Common.FieldControl : #ReadOnly;

    name @Common.FieldControl : #ReadOnly;

    email @Common.FieldControl : #ReadOnly;

    totalPoints @Common.FieldControl : #ReadOnly;

    tier @Common.FieldControl : #ReadOnly;

};


// =============================================================
// REDEMPTIONS
// =============================================================
// This is ONLY defined here because Customer app needs
// Redemption History and there is currently no other
// application annotation for Redemptions.
// =============================================================

annotate service.Redemptions with @(
    
    UI.LineItem : [

        {
            $Type : 'UI.DataField',

            Label : 'Points Used',

            Value : pointsUsed
        },

        {
            $Type : 'UI.DataField',

            Label : 'Redemption Date',

            Value : redeemDate
        },

        {
            $Type : 'UI.DataField',

            Label : 'Remarks',

            Value : remarks
        }
    ]
);