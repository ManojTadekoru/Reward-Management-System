sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/TextArea",
    "sap/m/Button",
    "sap/m/VBox"
], function (
    ControllerExtension,
    MessageToast,
    MessageBox,
    Dialog,
    Label,
    Input,
    TextArea,
    Button,
    VBox
) {
    "use strict";

    return ControllerExtension.extend(
        "customers.ext.controller.CustomerObjectPage",
        {


            onRedeemPoints: async function (oContext) {

                console.log(
                    "[CUSTOMER] Redeem Points clicked"
                );



                if (Array.isArray(oContext)) {

                    oContext = oContext[0];
                }

                if (!oContext) {

                    MessageBox.error(
                        "Unable to determine the current customer."
                    );

                    return;
                }


                console.log(
                    "[CUSTOMER] Context:",
                    oContext
                );


                // =================================================
                // READ CUSTOMER DATA
                // =================================================

                let oCustomer;

                try {

                    oCustomer =
                        await oContext.requestObject();

                } catch (oError) {

                    console.error(
                        "[CUSTOMER] Failed to read customer:",
                        oError
                    );

                    MessageBox.error(
                        "Unable to read customer information."
                    );

                    return;
                }


                console.log(
                    "[CUSTOMER] Customer:",
                    oCustomer
                );


                // =================================================
                // GET CUSTOMER ID / POINTS
                // =================================================

                const customerID =
                    oCustomer.customerID;

                const totalPoints =
                    Number(
                        oCustomer.totalPoints || 0
                    );


                console.log(
                    "[CUSTOMER] Customer ID:",
                    customerID
                );

                console.log(
                    "[CUSTOMER] Available Points:",
                    totalPoints
                );


                if (!customerID) {

                    MessageBox.error(
                        "Customer ID could not be determined."
                    );

                    return;
                }


                // =================================================
                // POINTS INPUT
                // =================================================

                const oPointsInput =
                    new Input({

                        type: "Number",

                        placeholder:
                            "Enter points to redeem",

                        width: "100%"
                    });


                // =================================================
                // REMARKS INPUT
                // =================================================

                const oRemarksInput =
                    new TextArea({

                        placeholder:
                            "Enter remarks",

                        rows: 3,

                        width: "100%"
                    });


                // =================================================
                // AVAILABLE POINTS
                // =================================================

                const oAvailablePoints =
                    new Label({

                        text:
                            "Available Points: "
                            + totalPoints
                    });


                // =================================================
                // LABELS
                // =================================================

                const oPointsLabel =
                    new Label({

                        text:
                            "Points to Redeem"
                    });


                const oRemarksLabel =
                    new Label({

                        text:
                            "Remarks"
                    });


                // =================================================
                // DIALOG CONTENT
                // =================================================

                const oContent =
                    new VBox({

                        width: "100%",

                        items: [

                            oAvailablePoints,

                            oPointsLabel,

                            oPointsInput,

                            oRemarksLabel,

                            oRemarksInput
                        ]
                    });


                // =================================================
                // DIALOG
                // =================================================

                const oDialog =
                    new Dialog({

                        title:
                            "Redeem Points",

                        contentWidth:
                            "400px",

                        content: [
                            oContent
                        ],


                        // =========================================
                        // REDEEM BUTTON
                        // =========================================

                        beginButton:
                            new Button({

                                text:
                                    "Redeem",

                                type:
                                    "Emphasized",

                                press:
                                    async function () {

                                        // =========================
                                        // GET INPUT VALUES
                                        // =========================

                                        const pointsUsed =
                                            Number(
                                                oPointsInput.getValue()
                                            );

                                        const remarks =
                                            oRemarksInput.getValue();


                                        console.log(
                                            "[CUSTOMER] Points:",
                                            pointsUsed
                                        );

                                        console.log(
                                            "[CUSTOMER] Remarks:",
                                            remarks
                                        );


                                        // =========================
                                        // VALIDATE POINTS
                                        // =========================

                                        if (
                                            !pointsUsed ||
                                            pointsUsed <= 0
                                        ) {

                                            MessageBox.error(
                                                "Points to redeem must be greater than zero."
                                            );

                                            return;
                                        }


                                        // =========================
                                        // CHECK AVAILABLE POINTS
                                        // =========================

                                        if (
                                            pointsUsed >
                                            totalPoints
                                        ) {

                                            MessageBox.error(
                                                "Insufficient points. "
                                                + "Available points: "
                                                + totalPoints
                                            );

                                            return;
                                        }


                                        // =========================
                                        // GET ODATA MODEL
                                        // =========================

                                        const oModel =
                                            oContext.getModel();


                                        // =========================
                                        // REDEMPTIONS LIST BINDING
                                        // =========================

                                        const oListBinding =
                                            oModel.bindList(
                                                "/Redemptions"
                                            );


                                        try {

                                            console.log(
                                                "[CUSTOMER] Creating redemption..."
                                            );


                                            // =====================
                                            // CREATE REDEMPTION
                                            // =====================

                                            const oRedemption =
                                                oListBinding.create({

                                                    customer_customerID:
                                                        customerID,

                                                    pointsUsed:
                                                        pointsUsed,

                                                    remarks:
                                                        remarks
                                                });


                                            // =====================
                                            // WAIT FOR CREATE
                                            // =====================

                                            await
                                                oRedemption.created();


                                            console.log(
                                                "[CUSTOMER] Redemption created successfully"
                                            );


                                            // =====================
                                            // SUCCESS MESSAGE
                                            // =====================

                                            MessageToast.show(
                                                "Points redeemed successfully."
                                            );


                                            // =====================
                                            // CLOSE DIALOG
                                            // =====================

                                            oDialog.close();


                                            // =====================
                                            // REFRESH CUSTOMER
                                            // =====================

                                            try {

                                                await
                                                    oContext.requestRefresh();

                                            } catch (oRefreshError) {

                                                console.warn(
                                                    "[CUSTOMER] Refresh failed:",
                                                    oRefreshError
                                                );
                                            }


                                        } catch (oError) {

                                            console.error(
                                                "[CUSTOMER] Redemption failed:",
                                                oError
                                            );


                                            let sMessage =
                                                "Failed to redeem points.";


                                            if (
                                                oError &&
                                                oError.message
                                            ) {

                                                sMessage =
                                                    oError.message;
                                            }


                                            MessageBox.error(
                                                sMessage
                                            );
                                        }
                                    }
                            }),


                        // =========================================
                        // CANCEL BUTTON
                        // =========================================

                        endButton:
                            new Button({

                                text:
                                    "Cancel",

                                press:
                                    function () {

                                        oDialog.close();
                                    }
                            }),


                        // =========================================
                        // AFTER CLOSE
                        // =========================================

                        afterClose:
                            function () {

                                oDialog.destroy();
                            }
                    });


                // =================================================
                // OPEN DIALOG
                // =================================================

                oDialog.open();
            }
        }
    );
});