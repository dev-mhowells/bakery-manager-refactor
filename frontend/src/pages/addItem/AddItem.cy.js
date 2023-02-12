import React from "react";
import AddItem from "./AddItem";

describe('<AddItem />', () => {

    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: '/items'
        },
        {items:
        [{
            batchQuantity: 12,
            costToBake: 11,
            image: "https://firebasestorage.googleapis.com/v0/b/bakery-8914b.appspot.com/o/images%2Frasberry-pancakes.jpg?alt=media&token=3e781bae-6591-4739-8211-61dca2aa4cd7",
            ingredients: ['starberries, flour'],
            itemName: "pancakes",
            price: 29,
            __v: 0,
            _id: "63dd1fcd2701fa46c0071be0"
        }]}).as('result')

        cy.mount(<AddItem />)

        cy.wait('@result')
    })

    it('renders', () => {

        cy.get('[data-cy=item-name]').should('have.text', 'pancakes')
    })

    it('opens a modal for new item', () => {

        cy.get('[data-cy=new-item-btn]').click()
        cy.get('[data-cy=new-item-title]').should('be.visible')
    })

    it('closes the modal', () => {

        cy.get('[data-cy=new-item-btn]').click()
        cy.get('[data-cy=close-modal-btn]').click()
        cy.get('[data-cy=new-item-title]').should('not.be.visible')

    })

    // add tests for failing popup when all fields not input.

    it('adds an item', () => {

        cy.get('[data-cy=new-item-btn]').click()

        cy.intercept('POST', '/items', {
            itemName: 'fruit salad',
            price: '24',
            image: 'url',
            constToBake: '4',
            ingredients: 'orange, cherry',
            batchQuantity: '12'
        }).as('createItem')

        // cy.get('[data-cy=item-input]').type('fruit salad')
        // cy.get('[data-cy=price-input]').type('24')
        // cy.get('[data-cy=cost-to-bake-input]').type('4')
        // cy.get('[data-cy=ingredients-input]').type('orange, cherry')
        // cy.get('[data-cy=batch-quantity-input]').type('12')

        cy.get('[data-cy=add-btn]').click() 

        cy.wait('@createItem').then(interception => {
            expect(interception.response.body).to.deep.eq({
                itemName: 'fruit salad',
                price: '24',
                image: 'url',
                constToBake: '4',
                ingredients: 'orange, cherry',
                batchQuantity: '12'
            })
        })
    
    })

})
