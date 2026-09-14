namespace loyalty;

entity Customer {

    key customerID   : UUID;

        name         : String(100);
        email        : String(150);

        totalPoints  : Integer default 0;

        tier         : String(20) default 'Bronze';

        transactions : Composition of many Transaction
                           on transactions.customer = $self;

        redemptions  : Composition of many Redemption
                           on redemptions.customer = $self;
}

type Channel : String enum {
    Store  @title: 'Store';
    Online @title: 'Online';
};

entity ChannelCodes {
    key code : Channel;
        name : String(20);
}


entity Transaction {

    key txnID        : UUID;

        customer     : Association to Customer;

        channel      : Channel;

        amount       : Decimal(10, 2);

        txnDate      : DateTime;

        pointsEarned : Integer default 0;
}


entity Redemption {

    key redeemID   : UUID;

        customer   : Association to Customer;

        pointsUsed : Integer;

        redeemDate : DateTime;

        remarks    : String(255);
}


entity RewardPolicy {

    key policyID    : UUID;

        channel     : String(20);

        pointsRate  : Decimal(10, 4);

        description : String(255);

        isActive    : Boolean default true;
}
