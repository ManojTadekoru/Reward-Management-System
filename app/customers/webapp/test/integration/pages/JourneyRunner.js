sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"customers/test/integration/pages/CustomersList.gen",
	"customers/test/integration/pages/CustomersObjectPage.gen",
	"customers/test/integration/pages/TransactionsObjectPage.gen"
], function (JourneyRunner, CustomersListGenerated, CustomersObjectPageGenerated, TransactionsObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('customers') + '/test/flp.html#app-preview',
        pages: {
			onTheCustomersListGenerated: CustomersListGenerated,
			onTheCustomersObjectPageGenerated: CustomersObjectPageGenerated,
			onTheTransactionsObjectPageGenerated: TransactionsObjectPageGenerated
        },
        async: true
    });

    return runner;
});

