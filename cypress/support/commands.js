/// <reference types="Cypress" />

Cypress.Commands.add('fillMandatoryFieldsAndSubmit',(firstName,lastName,email, area) =>{

    cy.get('#firstName').type(firstName, {delay:0})
    cy.get('#lastName').type(lastName, {delay:0})
    cy.get('#email').type(email, {delay:0})
    cy.get('#open-text-area').type(area, {delay:0})


})