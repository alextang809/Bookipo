sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ], function (Controller, JSONModel) {
    "use strict";
  
    return Controller.extend("sap.ui.demo.controller.Detail", {
      onInit: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);
      },
  
      _onRouteMatched: function (oEvent) {
        var sPath = window.decodeURIComponent(oEvent.getParameter("arguments").bookPath);
        var oModel = this.getView().getModel();
        var oBookModel = new JSONModel(oModel.getProperty(sPath));
        this.getView().setModel(oBookModel, "Book");
      }
    });
  });
  