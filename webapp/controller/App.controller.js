sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("com.jonasdp.trac2018.createsalesorder.UI5_dlw_TRAC2018_day1_create.controller.App", {
		
		onAfterRendering: function(){
			//initialize item model
			this.getView().getModel("itemModel").setData({
				"MaterialID": "",
				"MaterialDesc": "",
				"Quantity": 0
			});
			
			//initialize items model
			this.getView().getModel("itemsModel").setData([]);
			
			//initialize customer model
			this.getView().getModel("customerModel").setData({
				"CustomerID": ""	
			});
		},
		
		onCustomerComboBoxChange: function(oEvent){
			var sCustId = oEvent.getSource().getSelectedItem().getBindingContext("customersModel").getProperty("CustomerNumber");
			this.getView().getModel("customerModel").setProperty("/CustomerID", sCustId);
		},
		
		onMaterialComboBoxChange: function(oEvent){
			var oSelItem = oEvent.getSource().getSelectedItem().getBindingContext();
			var sMatId = oSelItem.getProperty("MaterialNumber");
			var sMatName = oSelItem.getProperty("MaterialDescription");
			
			this.getView().getModel("itemModel").setProperty("/MaterialID", sMatId);
			this.getView().getModel("itemModel").setProperty("/MaterialDesc", sMatName);
		},
		
		onAddItemButtonPress: function(){
			var oItemModel = this.getView().getModel("itemModel").getData();
			var oItemsModel = this.getView().getModel("itemsModel");
			
			oItemModel.Item = oItemsModel.getData().length + 1;
			
			this.getView().getModel("itemsModel").getData().push({
				"Item": oItemsModel.getData().length + 1,
				"MaterialID": oItemModel.MaterialID,
				"MaterialDesc": oItemModel.MaterialDesc,
				"Quantity": oItemModel.Quantity.toString()
			});
			
			oItemsModel.refresh(true);
		},
		
		onCreateOrderBtnPress: function(){
			this.getView().setBusy(true);
			
			//todo: validate input
			
			var oCustomer = this.getView().getModel("customerModel");
			var oItems = this.getView().getModel("itemsModel");
			
			var aItems = [];
			oItems.getData().forEach(function(oItem){
				aItems.push({
					"MaterialNumber": oItem.MaterialID,
					"OrderQuantity": oItem.Quantity,
					"TargetUOM": "PCE",
					"ItemCategory": "TAN"
				});
			});
			
			debugger;
			
			var oCreatePayload = {
				"DocType" : "OR",
				"SalesOrg" : "S010",
				"DistrChannel" : "01",
				"Division" : "01",
				"NetValue" : "50.000",
				"Currency" : "EUR",
				"CreatedBy" : "JONASDP",
				"CreatedOn" : new Date(),
				"NavOrderItems" : aItems,
				 "NavOrderPartners" : [{
				   "PartnerRole" : "SH",
				   "PartnerNumber" : oCustomer.getProperty("/CustomerID")}]
			};
			
			var that = this;
			this.getView().getModel().create("/OrderSet", oCreatePayload, {
				success: function(oData, response){
					var sMsg = that.getView().getModel("i18n").getResourceBundle().getText("Response.CreateOrder.Success", [oData.SalesDocument]);
					MessageToast.show(sMsg);
					that.getView().setBusy(false);
				},
				error: function(oError){
					var sMsg = that.getView().getModel("i18n").getResourceBundle().getText("Common.Error");
					MessageBox.show(sMsg, {
						details: JSON.parse(oError.responseText)
					});
					that.getView().setBusy(false);
				}
			});
		}
		
	});
});