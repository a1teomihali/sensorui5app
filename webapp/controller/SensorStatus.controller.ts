import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import { Route$MatchedEvent } from "sap/ui/core/routing/Route";


interface RouteMatchedParameters {
    index: number
}

export default class SensorStatus extends Controller {

    public onInit() {
        (this.getOwnerComponent() as UIComponent).getRouter().getRoute("RouteSensorStatus")?.attachMatched(this.onRouteMatched, this);
    }

    public onRouteMatched(event: Route$MatchedEvent) {
        this.getView()?.bindElement({
            path: "/sensors/" + (event.getParameter("arguments") as RouteMatchedParameters).index,
            model: "sensorModel"
        });
    }

    navToSensors() {
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteSensors");
    }
}

function onInit() {
    throw new Error("Function not implemented.");
}


function onRouteMatched(event: Event | undefined, Route$MatchedEvent: any) {
    throw new Error("Function not implemented.");
}


function navToSensors() {
    throw new Error("Function not implemented.");
}
