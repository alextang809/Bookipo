sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Input"
], function (Controller, JSONModel, MessageToast, Dialog, Button, Label, Input) {
    "use strict";

    return Controller.extend("Bookipo.controller.App", {
        onInit: function () {
            // access to JSON Model
            this.oModel = this.getOwnerComponent().getModel();
        },

        onAddBook: function () {
            // create dialog lazily
            if (!this.newBookDialog) {
                this.newBookDialog = new Dialog({
                    title: 'Add a Book',
                    content: [
                        new Label({ text: 'Title', labelFor: 'titleInput' }),
                        new Input('titleInput', { liveChange: function(oEvent) {
                            var sText = oEvent.getParameter('value');
                            var parent = oEvent.getSource().getParent();
                            parent.getBeginButton().setEnabled(sText.length > 0);
                        }, width: '100%', placeholder: 'Enter book title...' }),
                        new Label({ text: 'Author', labelFor: 'authorInput' }),
                        new Input('authorInput', { width: '100%', placeholder: 'Enter book author...' }),
                        new Label({ text: 'Genre', labelFor: 'genreInput' }),
                        new Input('genreInput', { width: '100%', placeholder: 'Enter book genre...' })
                    ],
                    beginButton: new Button({
                        text: 'Add',
                        enabled: false,
                        press: function () {
                            var sTitle = sap.ui.getCore().byId('titleInput').getValue();
                            var sAuthor = sap.ui.getCore().byId('authorInput').getValue();
                            var sGenre = sap.ui.getCore().byId('genreInput').getValue();

                            this.oModel.getData().push({ title: sTitle, author: sAuthor, genre: sGenre });
                            this.oModel.refresh();

                            MessageToast.show('Book added');
                            this.newBookDialog.close();
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: 'Cancel',
                        press: function () {
                            this.newBookDialog.close();
                        }.bind(this)
                    }),
                    afterClose: function() {
                        this.newBookDialog.destroy();
                    }.bind(this)
                });

                // to get access to the global model
                this.getView().addDependent(this.newBookDialog);
            }

            this.newBookDialog.open();
        },

        onUpdateBook: function () {
            // Similar to onAddBook, but instead of adding a new book, you find the selected book and update its properties
        },

        onDeleteBook: function () {
            // Find the selected book and remove it from the model
        }
    });
});
