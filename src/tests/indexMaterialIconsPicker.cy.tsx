import { MaterialIconsPicker } from '../components/MaterialIconsPicker/index';

const WRAPPER_STYLES: object = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
};

const DEFAULT_PROPS: object = {

};

describe('Rendering of the elements of <MaterialIconsPicker />', () => {
  it('expected elements are rendered correctly given default props', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-container]').should('be.visible');
    cy.get('[data-testid=mip-container]').should('be.visible');
    cy.get('[data-testid=mip-searchContainer]').should('be.visible');
    cy.get('[data-testid=mip-searchIcon]').should('be.visible');
    cy.get('[data-testid=mip-searchInput]').should('be.visible');
    cy.get('[data-testid=mip-optionContainer]').should('be.visible');
    cy.get('[data-testid=mip-typeContainer]').should('be.visible');
    cy.get('[data-testid=mip-typeSelected]').should('be.visible');
    cy.get('[data-testid=mip-typeArrow]').should('be.visible');
    cy.get('[data-testid=mip-typeOptionsContainer]').should('not.exist');
    cy.get('[data-testid=mip-typeOption]').should('not.exist');
    cy.get('[data-testid=mip-colorSelectorContainer]').should('be.visible');
    cy.get('[data-testid=mip-colorSelectedIndicator]').should('be.visible');
    cy.get('[data-testid=mip-colorSelected]').should('be.visible');
    cy.get('[data-testid=mip-colorSelectorArrow]').should('be.visible');
    cy.get('[data-testid=mip-palatteContainer]').should('not.exist');
    cy.get('.w-color-saturation').should('not.exist');
    cy.get('.w-color-alpha-pointer').should('not.exist');
    cy.get('[data-testid=mip-iconsContainer]').should('be.visible');
    cy.get('[data-testid=mip-iconContainer]').should('be.visible');
    cy.get('[data-testid=mip-icon]').should('be.visible');
    cy.get('[data-testid=mip-iconTip]').should('not.be.visible');
    cy.get('[data-testid=mip-loadingContainer]').should('not.exist');
    cy.get('[data-testid=mip-loading]').should('not.exist');
    cy.get('[data-testid=mip-iconsContainerPlaceholder]').should('not.exist');
  });
});