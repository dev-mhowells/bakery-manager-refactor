import React from 'react'
import Confirmation from './confirmation'

describe('<Confirmation />', () => {
        it('displays confirmation message', () => {
            cy.mount(<Confirmation />);
            cy.get('[data-cy="confirmation_message"]').should("have.text", 
            "Your order is confirmed and will be delivered on DATE");
            
        })},

        it('displays confirmed order information', () => {
            // mock data to test fetch request
            const mockData = { confirmedOrder: [{confirmedOrder: []}] 

            }

            cy.intercept({
                method: 'GET',
                url: '/bakers'
            },{ confirmedOrder: [
            { confirmedOrder: ['muffin'],
              orderId: "65739823456789098765432" 
            }]}).as('result')
            
            cy.mount(<Confirmation />);

            // cy.wait("").then(() => {
            //     cy.get('[data-cy="order contents"]')
            //     .should('contain.text', "")
            // })
            cy.wait("@result")
        })
)