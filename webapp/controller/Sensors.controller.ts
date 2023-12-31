import ResourceBundle from "sap/base/i18n/ResourceBundle";
import { IconTabBar$SelectEvent } from "sap/m/IconTabBar";
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter";
import "sap/ui/model/odata/Filter";
import "sap/ui/export/util/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import { Threshold } from "../format/util";
import Dialog from "sap/m/Dialog";
import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace devuiapp.sensormanager.controller
 */


export default class Sensors extends Controller {

    public onInit() {        

        const ownerComp = this.getOwnerComponent(); 
        this.getSensorModel().dataLoaded().then(function() {
            const resourceModel = ownerComp?.getModel("i18n") as ResourceModel;
            const resourceBundle = resourceModel.getResourceBundle() as ResourceBundle;
            MessageToast.show(resourceBundle.getText("msgSensorDataLoaded") as string, { closeOnBrowserNavigation: false });
            }.bind(this)).catch(function(oErr: Error){
                MessageToast.show(oErr.message, { closeOnBrowserNavigation: false });
            });
    }

    public getSensorModel() {
        return this.getOwnerComponent()?.getModel("sensorModel") as JSONModel;
    }


    private statusFilters: Filter[] = [];

    onFilterSelect(event: IconTabBar$SelectEvent): void {

        const listBinding = this.getView()?.byId("sensorsList")?.getBinding("items") as ListBinding;
        const key = (event.getParameter("key") as string);

        if (key === "Cold") {
            this.statusFilters = [new Filter("temperature", FilterOperator.LT, Threshold.Warm, false)];
        } else if (key === "Warm") {
            this.statusFilters = [new Filter("temperature", FilterOperator.BT, Threshold.Warm, Threshold.Hot)];
        } else if (key === "Hot") {
            this.statusFilters = [new Filter("temperature", FilterOperator.GT, Threshold.Hot, false)];
        } else {
            this.statusFilters = [];
        }

        listBinding.filter(this.statusFilters);
    }

    
   private dialog : Promise<Dialog>;

   onCustomerInfoPress() : void {
    this.dialog ??= this.loadFragment({
        name: 'devuiapp.sensormanager.view.CustomerDialog'
    }) as Promise<Dialog>;

    this.dialog.then(dialog => dialog.open())
    .catch((err:Error) => MessageToast.show(err.message));

   }


   onCustomerSelectChange(oEvent: any): void {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("name", "Contains", sValue);
    var oBinding = oEvent.getSource().getBinding("items");
    oBinding.filter([oFilter]);
   }


/*   onCustomerSelectConfirm(oEvent: any) : void {
    var aSelectedItems = oEvent.getParameter("selectedItems");
    var oBinding = this.getView()?.byId("sensorsList")?.getBinding("items") as ListBinding;
    this._aCustomerFilters = aSelectedItems.map((oItem: any) => {
        return new Filter("customer", "EQ", oItem.getText());
    });
    oBinding.filter(this._aCustomerFilters.concat(this._aStatusFilters));
    }
*/

   onCustomerInfoClose() : void {
    this.dialog.then(function(dialog) {
        dialog.close();
    }).catch(function(err: Error){
        MessageToast.show(err.message);
    });
    }

    navToSensorStatus(event: ListItemBase$PressEvent) {
        const sensorIndex = event.getSource().getBindingContext("sensorModel")?.getProperty("index");
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteSensorStatus", {index: sensorIndex});
    }
}