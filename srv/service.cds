using {loyalty as db} from '../db/schema';

service LoyaltyService @(path: '/loyalty') {

    @restrict: [
        {
            grant: 'READ',
            to   : 'Customer'
        },
        {
            grant: 'READ',
            to   : 'RetailStaff'
        }
    ]
    entity Customers      as projection on db.Customer;

    @odata.draft.enabled
    @restrict: [
        {
            grant: [
                'READ',
                'CREATE'
            ],
            to   : 'RetailStaff'
        },
        {
            grant: 'READ',
            to   : 'Customer'
        }
    ]
    entity Transactions   as projection on db.Transaction;

    @restrict: [{
        grant: [
            'CREATE',
            'READ'
        ],
        to   : 'Customer'
    }]
    entity Redemptions    as projection on db.Redemption;

    @odata.draft.enabled
    @restrict: [{
        grant: [
            'READ',
            'CREATE',
            'UPDATE',
            'DELETE'
        ],
        to   : 'Admin'
    }]
    entity RewardPolicies as projection on db.RewardPolicy;

    @cds.autoexpose
    @restrict: [
        {
            grant: 'READ',
            to   : 'Customer'
        },
        {
            grant: 'READ',
            to   : 'RetailStaff'
        }
    ]
    entity ChannelCodes   as projection on db.ChannelCodes;
}
