using LoyaltyService as service from '../../srv/service';

annotate service.RewardPolicies with @(
    
    // =========================================================
    // OBJECT PAGE - FIELD GROUP
    // =========================================================

    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',

        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Channel',
                Value : channel
            },
            {
                $Type : 'UI.DataField',
                Label : 'Points Rate',
                Value : pointsRate
            },
            {
                $Type : 'UI.DataField',
                Label : 'Description',
                Value : description
            },
            {
                $Type : 'UI.DataField',
                Label : 'Active',
                Value : isActive
            }
        ]
    },


    // =========================================================
    // OBJECT PAGE - FACETS
    // =========================================================

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneralInformationFacet',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneralInformation'
        }
    ],


    // =========================================================
    // LIST REPORT
    // =========================================================

    UI.LineItem : [

        {
            $Type : 'UI.DataField',
            Label : 'Channel',
            Value : channel
        },

        {
            $Type : 'UI.DataField',
            Label : 'Points Rate',
            Value : pointsRate
        },

        {
            $Type : 'UI.DataField',
            Label : 'Description',
            Value : description
        },

        {
            $Type : 'UI.DataField',
            Label : 'Active',
            Value : isActive
        }
    ],


    // =========================================================
    // HEADER INFO
    // =========================================================

    UI.HeaderInfo : {
        $Type : 'UI.HeaderInfoType',

        TypeName : 'Reward Policy',

        TypeNamePlural : 'Reward Policies',

        Title : {
            $Type : 'UI.DataField',
            Value : channel
        },

        Description : {
            $Type : 'UI.DataField',
            Value : description
        }
    }

);