const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

    const {
        Customer,
        Transaction,
        Redemption,
        RewardPolicy
    } = cds.entities('loyalty');


    function calculateTier(points) {

        points = Number(points || 0);

        if (points >= 1000) {
            return 'Gold';
        }

        if (points >= 500) {
            return 'Silver';
        }

        return 'Bronze';
    }

    this.before('CREATE', 'Transactions', async (req) => {

        const { customer_customerID, channel, amount } = req.data;

        if (!customer_customerID) {
            return req.error(400, 'Customer is required');
        }

        const customer = await SELECT.one
            .from(Customer)
            .where({ customerID: customer_customerID });

        if (!customer) {
            return req.error(404, 'Customer not found');
        }

        if (!channel) {
            return req.error(400, 'Channel is required');
        }

        if (!['Online', 'Store'].includes(channel)) {
            return req.error(400, 'Channel must be Online or Store');
        }

        if (amount === undefined || amount === null) {
            return req.error(400, 'Transaction amount is required');
        }

        if (Number(amount) <= 0) {
            return req.error(400, 'Transaction amount must be greater than zero');
        }

        const policy = await SELECT.one
            .from(RewardPolicy)
            .where({ channel: channel, isActive: true });

        if (!policy) {
            return req.error(400, `No active reward policy found for ${channel}`);
        }

        const pointsRate = Number(policy.pointsRate);

        const pointsEarned = Math.floor(Number(amount) * pointsRate);

        req.data.pointsEarned = pointsEarned;

        if (!req.data.txnDate) {
            req.data.txnDate = new Date();
        }
    });

    this.after('CREATE', 'Transactions', async (data) => {

        const customerID = data.customer_customerID;

        const pointsEarned = Number(data.pointsEarned || 0);

        const customer = await SELECT.one
            .from(Customer)
            .where({ customerID: customerID });

        if (!customer) {
            return;
        }

        const currentPoints = Number(customer.totalPoints || 0);

        const newTotalPoints = currentPoints + pointsEarned;

        const tier = calculateTier(newTotalPoints);

        await UPDATE(Customer)
            .set({
                totalPoints: newTotalPoints,
                tier: tier
            })
            .where({ customerID: customerID });
    });


    // =========================================================
    // 3. CREATE REDEMPTION
    // =========================================================

    this.before('CREATE', 'Redemptions', async (req) => {

        const { customer_customerID, pointsUsed } = req.data;

        if (!customer_customerID) {
            return req.error(400, 'Customer is required');
        }

        const customer = await SELECT.one
            .from(Customer)
            .where({ customerID: customer_customerID });

        if (!customer) {
            return req.error(404, 'Customer not found');
        }

        if (pointsUsed === undefined || pointsUsed === null) {
            return req.error(400, 'Points used is required');
        }

        if (Number(pointsUsed) <= 0) {
            return req.error(400, 'Points used must be greater than zero');
        }

        const availablePoints = Number(customer.totalPoints || 0);
        const requestedPoints = Number(pointsUsed);

        if (requestedPoints > availablePoints) {
            return req.error(
                400,
                `Insufficient points. ` +
                `Available points: ${availablePoints}`
            );
        }

        if (!req.data.redeemDate) {
            req.data.redeemDate = new Date();
        }
    });


    this.after('CREATE', 'Redemptions', async (data) => {

        const customerID = data.customer_customerID;
        const pointsUsed = Number(data.pointsUsed || 0);

        const customer = await SELECT.one
            .from(Customer)
            .where({ customerID: customerID });

        if (!customer) {
            return;
        }

        const currentPoints = Number(customer.totalPoints || 0);
        const remainingPoints = currentPoints - pointsUsed;

        if (remainingPoints < 0) {
            throw new Error('Customer points cannot be negative');
        }

        const tier = calculateTier(remainingPoints);

        await UPDATE(Customer)
            .set({
                totalPoints: remainingPoints,
                tier: tier
            })
            .where({ customerID: customerID });
    });


    this.before('CREATE', 'RewardPolicies', async (req) => {

    const { channel, pointsRate } = req.data;

    if (!channel) {
        return req.error(400, 'Channel is required');
    }

    if (!['Online', 'Store'].includes(channel)) {
        return req.error(400, 'Channel must be Online or Store');
    }

    if (pointsRate === undefined || pointsRate === null) {
        return req.error(400, 'Points rate is required');
    }

    if (Number(pointsRate) <= 0) {
        return req.error(400, 'Points rate must be greater than zero');
    }

    const existingPolicy = await SELECT.one
        .from(RewardPolicy)
        .where({
            channel: channel,
            isActive: true
        });

    if (existingPolicy) {
        return req.error(
            400,
            `Active reward policy already exists ` +
            `for ${channel}`
        );
    }
});


this.before('UPDATE', 'RewardPolicies', async (req) => {

    const { channel, pointsRate } = req.data;

    if (
        channel !== undefined &&
        !['Online', 'Store'].includes(channel)
    ) {
        return req.error(400, 'Channel must be Online or Store');
    }

    if (
        pointsRate !== undefined &&
        Number(pointsRate) <= 0
    ) {
        return req.error(400, 'Points rate must be greater than zero');
    }
});

});