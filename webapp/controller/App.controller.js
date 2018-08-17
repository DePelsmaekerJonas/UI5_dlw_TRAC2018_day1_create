sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
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
			var sCustId = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("CustomerID");
			this.getView().getModel("customerModel").setProperty("/CustomerID", sCustId);
		},
		
		onMaterialComboBoxChange: function(oEvent){
			var sMatId = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("ProductID");
			var sMatName = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("ProductName");
			
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
				"Quantity": oItemModel.Quantity
			});
			
			oItemsModel.refresh(true);
		},
		
		onCreateOrderBtnPress: function(){
			//TODO
		}
		
	});
});