sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/system/rewardsystem/test/integration/pages/RewardPoliciesList.gen",
	"com/system/rewardsystem/test/integration/pages/RewardPoliciesObjectPage.gen"
], function (JourneyRunner, RewardPoliciesListGenerated, RewardPoliciesObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/system/rewardsystem') + '/test/flp.html#app-preview',
        pages: {
			onTheRewardPoliciesListGenerated: RewardPoliciesListGenerated,
			onTheRewardPoliciesObjectPageGenerated: RewardPoliciesObjectPageGenerated
        },
        async: true
    });

    return runner;
});

