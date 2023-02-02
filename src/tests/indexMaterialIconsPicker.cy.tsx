import { MaterialIconsPicker } from '../components/MaterialIconsPicker/index';
import { ICON_TYPES } from '../lib/constants';

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

describe('rendering of the elements of <MaterialIconsPicker />', () => {
  it('expected elements are rendered correctly without props', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-container]').should('be.visible');
    cy.get('[data-testid=mip-container]').should('be.visible');
    cy.get('[data-testid=mip-searchContainer]').should('be.visible');
    cy.get('[data-testid=mip-searchIcon]').should('be.visible');
    cy.get('[data-testid=mip-searchInput]').should('be.visible');
    cy.get('[data-testid=mip-searchInput]').invoke('attr', 'placeholder').should('contain', 'Search');
    cy.get('[data-testid=mip-optionContainer]').should('be.visible');
    cy.get('[data-testid=mip-typeContainer]').should('be.visible');
    cy.get('[data-testid=mip-typeSelected]').should('be.visible');
    cy.get('[data-testid=mip-typeSelected]').contains(ICON_TYPES[0].label);
    cy.get('[data-testid=mip-typeArrow]').should('be.visible');
    cy.get('[data-testid=mip-typeOptionsContainer]').should('not.exist');
    cy.get('[data-testid=mip-typeOption]').should('not.exist');
    cy.get('[data-testid=mip-colorSelectorContainer]').should('be.visible');
    cy.get('[data-testid=mip-colorSelectedIndicator]').should('be.visible');
    cy.get('[data-testid=mip-colorSelected]').should('be.visible');
    cy.get('[data-testid=mip-colorSelected]').contains('#000000');
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

  it('mip-palatteContainer, .w-color-saturation, and .w-color-alpha-pointer should be visible after clicking on mip-colorSelectorContainer and be not in the document after clicking outside', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-colorSelectorContainer]').click();
    cy.get('.w-color-saturation').should('be.visible');
    cy.get('.w-color-alpha-pointer').should('be.visible');
    cy.get('body').click(0, 0, { force: true });
    cy.get('.w-color-saturation').should('not.exist');
    cy.get('.w-color-alpha-pointer').should('not.exist');
  });
});

describe('interaction related to searching the icons', () => {
  it('change the value of mip-searchInput to book and click on mip-searchIcon', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
    cy.get('[data-testid=mip-searchInput]').type('book');
    cy.get('[data-testid=mip-searchIcon]').click();
    cy.get('[data-testid=mip-iconContainer]').should('have.length', 12);
    cy.get('[data-testid=mip-searchInput]').invoke('val', '');
    cy.get('[data-testid=mip-searchIcon]').click();
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
  });

  it('change the value of mip-searchInput to book and hit the enter key', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
    cy.get('[data-testid=mip-searchInput]').type('book');
    cy.get('[data-testid=mip-searchInput]').trigger('keydown', { key: 'Enter' });
    cy.get('[data-testid=mip-iconContainer]').should('have.length', 12);
    cy.get('[data-testid=mip-searchInput]').invoke('val', '');
    cy.get('[data-testid=mip-searchInput]').trigger('keydown', { key: 'Enter' });
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
  });

  it('pressing Enter without focusing on mip-searchInput does not trigger rerendering', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
    cy.get('[data-testid=mip-searchInput]').type('book');
    cy.get('body').trigger('keydown', { key: 'Enter', force: true });
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
  });
});

describe('interaction related to icon type selection', () => {
  it('mip-typeOptionsContainer and its five mip-typeOption should be visible after clicking on mip-typeContainer and be not in the document after clicking outside', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-typeContainer]').click();
    cy.get('[data-testid=mip-typeOptionsContainer]').should('be.visible');
    cy.get('[data-testid=mip-typeOption]').should('be.visible');
    cy.get('[data-testid=mip-typeOption]').should('have.length', 5);
    cy.get('[data-testid=mip-typeOption]').each(($el, i) => {
      cy.wrap($el).contains(ICON_TYPES[i].label);
    });
    cy.get('body').click(0, 0, { force: true });
    cy.get('[data-testid=mip-typeOptionsContainer]').should('not.exist');
    cy.get('[data-testid=mip-typeOption]').should('not.exist');
  });

  it('selecting one mip-typeOption hides the dropdown and changes the className of all mip-icon to contain the selected type', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-icon]').each($el => {
      cy.wrap($el).invoke('attr', 'class').then(className => className.split('-')).should('have.length', 2);
    });
    cy.get('[data-testid=mip-typeContainer]').click();
    cy.get('[data-testid=mip-typeOption]').eq(1).click();
    cy.get('[data-testid=mip-icon]').each($el => {
      cy.wrap($el).invoke('attr', 'class').should('equal', `material-icons-${ICON_TYPES[1].value}`);
    });
    cy.get('[data-testid=mip-typeOptionsContainer]').should('not.exist');
  });
});