// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/m/MessageToast",
//     "sap/m/Dialog",
//     "sap/m/Button",
//     "sap/m/Label",
//     "sap/m/Input"
// ], function (Controller, JSONModel, MessageToast, Dialog, Button, Label, Input) {
//     "use strict";

//     return Controller.extend("Bookipo.controller.App", {
//         onInit: function () {
//             // access to JSON Model
//             this.oModel = this.getOwnerComponent().getModel();
//         },

//         onAddBook: function () {
//             // create dialog lazily
//             if (!this.newBookDialog) {
//                 this.newBookDialog = new Dialog({
//                     title: 'Add a Book',
//                     content: [
//                         new Label({ text: 'Title', labelFor: 'titleInput' }),
//                         new Input('titleInput', { liveChange: function(oEvent) {
//                             var sText = oEvent.getParameter('value');
//                             var parent = oEvent.getSource().getParent();
//                             parent.getBeginButton().setEnabled(sText.length > 0);
//                         }, width: '100%', placeholder: 'Enter book title...' }),
//                         new Label({ text: 'Author', labelFor: 'authorInput' }),
//                         new Input('authorInput', { width: '100%', placeholder: 'Enter book author...' }),
//                         new Label({ text: 'Genre', labelFor: 'genreInput' }),
//                         new Input('genreInput', { width: '100%', placeholder: 'Enter book genre...' })
//                     ],
//                     beginButton: new Button({
//                         text: 'Add',
//                         enabled: false,
//                         press: function () {
//                             var sTitle = sap.ui.getCore().byId('titleInput').getValue();
//                             var sAuthor = sap.ui.getCore().byId('authorInput').getValue();
//                             var sGenre = sap.ui.getCore().byId('genreInput').getValue();

//                             this.oModel.getData().push({ title: sTitle, author: sAuthor, genre: sGenre });
//                             this.oModel.refresh();

//                             MessageToast.show('Book added');
//                             this.newBookDialog.close();
//                         }.bind(this)
//                     }),
//                     endButton: new Button({
//                         text: 'Cancel',
//                         press: function () {
//                             this.newBookDialog.close();
//                         }.bind(this)
//                     }),
//                     afterClose: function() {
//                         this.newBookDialog.destroy();
//                     }.bind(this)
//                 });

//                 // to get access to the global model
//                 this.getView().addDependent(this.newBookDialog);
//             }

//             this.newBookDialog.open();
//         },

//         onUpdateBook: function () {
//             // Similar to onAddBook, but instead of adding a new book, you find the selected book and update its properties
//         },

//         onDeleteBook: function () {
//             // Find the selected book and remove it from the model
//         }
//     });
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ], function (Controller, JSONModel) {
    "use strict";
  
    return Controller.extend("sap.ui.demo.controller.App", {
      onInit: function () {
        // Set initial language
        sap.ui.getCore().getConfiguration().setLanguage("en");
  
        // Load JSON data
        var oModel = new JSONModel("model/Books.json");
        this.getView().setModel(oModel);
  
        // Load XML data
        var oUserModel = new sap.ui.model.xml.XMLModel();
        oUserModel.loadData("model/Users.xml");
        this.getView().setModel(oUserModel, "user");
      },
  
      onSwitchLanguage: function () {
        var sCurrentLanguage = sap.ui.getCore().getConfiguration().getLanguage();
        var sNewLanguage = sCurrentLanguage === "en" ? "de" : "en";
        sap.ui.getCore().getConfiguration().setLanguage(sNewLanguage);
      },
  
      onItemPress: function (oEvent) {
        // Navigate to detail page
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var oItem = oEvent.getSource();
        var sPath = oItem.getBindingContext().getPath();
        oRouter.navTo("detail", {
          bookPath: window.encodeURIComponent(sPath)
        });
      }

      onDelete: function(oEvent) {
        var oItem = oEvent.getSource();
        var oList = this.byId("bookList");
        var sPath = oItem.getBindingContext().getPath();
      
        // get data
        var oData = this.getView().getModel().getData();
      
        // get the item index
        var iIndex = parseInt(sPath.substring(sPath.lastIndexOf("/") + 1));
      
        // remove the item
        oData.Books.splice(iIndex, 1);
      
        // update the model
        this.getView().getModel().setData(oData);
        oList.getBinding("items").refresh();
      },
      
      onAdd: function() {
        // Just an example of adding a new book, you'll need a form in your view for user input
        var oData = this.getView().getModel().getData();
        var oNewBook = {
          "id": "3",
          "title": "New Book",
          "author": "New Author",
          "genre": "New Genre"
        };
        oData.Books.push(oNewBook);
        this.getView().getModel().setData(oData);
        this.byId("bookList").getBinding("items").refresh();
      },
      
      onUpdate: function() {
        // Just an example of updating an existing book, you'll need a form in your view for user input
        var oData = this.getView().getModel().getData();
        oData.Books[0].title = "Updated Book";
        this.getView().getModel().setData(oData);
        this.byId("bookList").getBinding("items").refresh();
      }
      
    });
  });
  