import { MaterialIconsPicker } from '../components/MaterialIconsPicker/index';
import { DEFAULT_ROW_ADDITION_NUMBER, ICON_TYPES } from '../lib/constants';
import { useState, useRef } from 'react';
import { hsvaToHex } from '@uiw/color-convert';
import * as baseStyles from '../lib/styles';
import "cypress-real-events";
import { MATERIAL_ICONS } from '../assets/materialIcons';

const WRAPPER_STYLES: object = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
};

const hexToRgb = (hex: string): string => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
}
/*
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
    cy.get('.w-color-hue').should('not.exist');
    cy.get('[data-testid=mip-iconsContainer]').should('be.visible');
    cy.get('[data-testid=mip-iconContainer]').should('be.visible');
    cy.get('[data-testid=mip-icon]').should('be.visible');
    cy.get('[data-testid=mip-iconTip]').should('not.exist');
    cy.get('[data-testid=mip-loadingContainer]').should('not.exist');
    cy.get('[data-testid=mip-loading]').should('not.exist');
    cy.get('[data-testid=mip-iconsContainerPlaceholder]').should('not.exist');
  });
});

describe('interaction related to searching the icons', () => {
  it('change the value of mip-searchInput to book and click on mip-searchIcon', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
    cy.get('[data-testid=mip-searchInput]').type('book');
    cy.get('[data-testid=mip-searchIcon]').click();
    cy.get('[data-testid=mip-iconContainer]').should('have.length', 12);
    cy.get('[data-testid=mip-searchInput]').clear();
    cy.get('[data-testid=mip-searchIcon]').click();
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
  });

  it('change the value of mip-searchInput to book and hit the enter key', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-iconContainer]').should('have.length.greaterThan', 12);
    cy.get('[data-testid=mip-searchInput]').type('book');
    cy.get('[data-testid=mip-searchInput]').trigger('keydown', { key: 'Enter' });
    cy.get('[data-testid=mip-iconContainer]').should('have.length', 12);
    cy.get('[data-testid=mip-searchInput]').clear();
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

describe('interaction related to color selection', () => {
  it('mip-palatteContainer, .w-color-saturation, and .w-color-hue should be visible after clicking on mip-colorSelectorContainer and be not in the document after clicking outside', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-colorSelectorContainer]').click();
    cy.get('.w-color-saturation').should('be.visible');
    cy.get('.w-color-hue').should('be.visible');
    cy.get('body').click(0, 0, { force: true });
    cy.get('.w-color-saturation').should('not.exist');
    cy.get('.w-color-hue').should('not.exist');
  });

  it('clicking on a pixel of .w-color-saturation changes the color of all icons', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-colorSelectorContainer]').click();
    cy.get('[data-testid=mip-colorSelected]').contains('#000000');
    cy.get('.w-color-saturation').click(10, 10);
    cy.get('[data-testid=mip-colorSelected]').contains('#f2e6e6');
    cy.get('[data-testid=mip-icon]').each($el => {
      expect($el[0].style.color).to.be.equal(hexToRgb('#f2e6e6'));
    });
  });

  it('clicking on a pixel of .w-color-hue changes the color of all icons', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-colorSelectorContainer]').click();
    cy.get('[data-testid=mip-colorSelected]').contains('#000000');
    cy.get('.w-color-saturation').click(10, 10);
    cy.get('.w-color-hue').click(10, 10);
    cy.get('[data-testid=mip-colorSelected]').contains('#f2eae6');
    cy.get('[data-testid=mip-icon]').each($el => {
      expect($el[0].style.color).to.be.equal(hexToRgb('#f2eae6'));
    });
  });
});
*/
describe('number of icons', () => {
  it('number of icons of the initial render is always equal to col * (row + 1) when the icon picker has various width and height', function() {
    const MIN_WIDTH = 500, MAX_WIDTH = 800, WIDTH_UNIT = 100;
    const MIN_HEIGHT = 500, MAX_HEIGHT = 800, HEIGHT_UNIT = 100;
    const widths = [];
    const heights = [];
    for(let width = MIN_WIDTH; width <= MAX_WIDTH; width += WIDTH_UNIT) {
      widths.push(width);
    }
    for(let height = MIN_HEIGHT; height <= MAX_HEIGHT; height += HEIGHT_UNIT) {
      heights.push(height);
    }
    cy
      .wrap(widths)
      .each(width => {
        cy
          .wrap(heights)
          .each(height => {
            cy.viewport(MAX_WIDTH + 10, MAX_HEIGHT + 10);
            cy.mount(<div style={{ ...WRAPPER_STYLES, width: width + 'px', height: height + 'px' }}><MaterialIconsPicker /></div>);
            cy.get('[data-testid=mip-iconsContainer]').as('iconsContainers');
            cy.get('[data-testid=mip-iconContainer]').as('iconContainers');
            cy.wrap(null).then(() => {
              const { rowCount, colCount } = baseStyles.getIconsContainerRowColCounts({ current: this.iconsContainers[0] }, baseStyles.ICON_CONTAINER_BASE_STYLE);
              const size = this.iconContainers.length;
              let visibleCount = size;
              cy
                // .wrap(size)
                // .should('eq', (rowCount + 1) * colCount)
                .then(() => {
                  for(let i = size - 1; i >= 0; --i) {
                    // cy.wrap(12).should('eq', 34);
                    if(this.iconContainers[i].offsetTop < this.iconsContainers[0].scrollHeight) break;
                    else visibleCount--;
                  }
                  // expect(visibleCount).to.be.equal(rowCount * colCount);
                })
                // .then(() => expect(99).to.be.equal(11))
                .then(() => expect(visibleCount).to.be.equal(rowCount * colCount - 11))
                // .wrap(visibleCount)
                // .should('eq', rowCount * colCount);
            });
          });
      })
  });
  /*
  it('number of icons increases by DEFAULT_ROW_ADDITION_NUMBER * col by default', async () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-iconsContainer]').then(elements => {
      const rowCount: number = window.getComputedStyle(elements[0]).getPropertyValue('grid-template-rows')?.split(' ').length || 0;
      const colCount: number = window.getComputedStyle(elements[0]).getPropertyValue('grid-template-columns')?.split(' ').length || 0;
      cy.get('[data-testid=mip-iconContainer]').should('have.length', colCount * rowCount);
      cy.get('[data-testid=mip-iconsContainer]').scrollTo(0, elements[0].scrollHeight);
      cy.get('[data-testid=mip-iconContainer]').should('have.length', colCount * rowCount + DEFAULT_ROW_ADDITION_NUMBER * colCount);
      cy.get('[data-testid=mip-iconsContainer]').scrollTo(0, elements[0].scrollHeight);
      cy.get('[data-testid=mip-iconContainer]').should('have.length', colCount * rowCount + DEFAULT_ROW_ADDITION_NUMBER * colCount * 2);
    });
  });

  it('number of icons may be not divisible by colCount given certain search input', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy.get('[data-testid=mip-iconsContainer]')
      .then(elements => window.getComputedStyle(elements[0]).getPropertyValue('grid-template-columns')?.split(' ').length || 0)
      .then(colCount => {
        cy.get('[data-testid=mip-searchInput]').type('book');
        cy.get('[data-testid=mip-iconContainer]').then(elements => cy.wrap(elements.length % colCount).should('not.equal', 0));
      })
  });*/
});
/*
describe('interaction of mip-iconTip', () => {
  it('mip-iconTip is visible once users hover over mip-icon', function() {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy
      .get('[data-testid=mip-iconContainer]')
      .each((iconContainers, i) => {
        cy
          .wrap(iconContainers[0])
          .trigger('mouseover')
          .get('[data-testid=mip-iconTip]')
          .first()
          .should('be.visible')
          .wrap(iconContainers[0])
          .trigger('mouseout');
      });
  });
  
  it('mip-iconTip contains the right text content', function() {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker /></div>);
    cy
      .get('[data-testid=mip-iconContainer]')
      .each((iconContainers, i) => {
        cy
          .wrap(iconContainers[0])
          .trigger('mouseover')
          .get('[data-testid=mip-iconTip]')
          .first()
          .should('have.text', MATERIAL_ICONS[i])
          .wrap(iconContainers[0])
          .trigger('mouseout');
        
      });
  });
  /*
  it('test the positioning of mip-iconTip under different browser sizes', function() {
    const MIN_WIDTH = 500, MAX_WIDTH = 500, WIDTH_UNIT = 100;
    const MIN_HEIGHT = 500, MAX_HEIGHT = 500, HEIGHT_UNIT = 100;
    for(let width = MIN_WIDTH; width <= MAX_WIDTH; width += WIDTH_UNIT) {
      for(let height = MIN_HEIGHT; height <= MAX_HEIGHT; height += HEIGHT_UNIT) {
        cy.viewport(width + 10, height + 10);
        cy.mount(<div style={{ ...WRAPPER_STYLES, width: width + 'px', height: height + 'px' }}><MaterialIconsPicker /></div>);
        cy.get('[data-testid=mip-iconsContainer]').as('iconsContainers');
        cy
          .get('[data-testid=mip-iconContainer]')
          .each((iconContainers, i) => {
            const iconContainer = iconContainers[0];
            cy
              .wrap(iconContainer)
              .trigger('mouseover')
              .get('[data-testid=mip-iconTip]')
              .as('iconTips')
              .then(() => {
                const iconsContainerRect = this.iconsContainers[0].getBoundingClientRect();
                const iconContainerRect = iconContainer.getBoundingClientRect();
                const iconTipRect = this.iconTips[0].getBoundingClientRect();
                let expectedIconTipX = iconContainerRect.left + (iconContainerRect.width - iconTipRect.width) * 0.5;
                if(expectedIconTipX < iconsContainerRect.left) expectedIconTipX = iconsContainerRect.left + 2;
                else if(expectedIconTipX + iconTipRect.width + 2 > iconsContainerRect.left + this.iconsContainers[0].clientWidth) expectedIconTipX = iconsContainerRect.left + iconsContainerRect.width - iconTipRect.width - 2;
                cy.wrap(Math.abs(expectedIconTipX - iconTipRect.left)).should('be.lessThan', 2);
                cy.wrap(parseInt(this.iconTips[0].style.top)).should('be.oneOf', [iconContainerRect.height + 2, -1 * iconTipRect.height - 2, 0]);
              })
              .wrap(iconContainer)
              .trigger('mouseout');
          });
      }
    }
  });
});

describe('test the styles prop', () => {
  it('test styles prop: container', function() {
    const containerStyle = {
      border: '1px solid red',
      borderRadius: '5px'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      container: (baseStyle: object) => ({
        ...baseStyle,
        ...containerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-container]')
      .as('container')
      .then(() => Object.entries({ ...baseStyles.CONTAINER_BASE_STYLE, ...containerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.container[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', val)
      }));
  });

  it('test styles prop: searchContainer', function() {
    const searchContainerStyle = {
      padding: '10px',
      height: '60px',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      searchContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...searchContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-searchContainer]')
      .as('searchContainer')
      .then(() => Object.entries({ ...baseStyles.SEARCH_CONTAINER_BASE_STYLE, ...searchContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.searchContainer[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', val)
      }));
  });

  it('test styles prop: searchIcon', function() {
    const searchIconStyle = {
      marginRight: '20px',
      height: '90%',
      border: '1px solid blue'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      searchIcon: (baseStyle: object) => ({
        ...baseStyle,
        ...searchIconStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-searchIcon]')
      .as('searchIcon')
      .then(() => Object.entries({ ...baseStyles.SEARCH_ICON_BASE_STYLE, ...searchIconStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.searchIcon[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', val)
      }));
  });

  it('test styles prop: searchInput', function() {
    const searchInputStyle = {
      width: '60%',
      flexGrow: 'unset',
      border: '1px solid black'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      searchInput: (baseStyle: object) => ({
        ...baseStyle,
        ...searchInputStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-searchInput]')
      .as('searchInput')
      .then(() => Object.entries({ ...baseStyles.SEARCH_INPUT_BASE_STYLE, ...searchInputStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.searchInput[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', val)
      }));
  });

  it('test styles prop: optionContainer', function() {
    const optionContainerStyle = {
      width: '80%',
      height: '30px',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      optionContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...optionContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-optionContainer]')
      .as('optionContainer')
      .then(() => Object.entries({ ...baseStyles.OPTION_CONTAINER_BASE_STYLE, ...optionContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.optionContainer[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', val)
      }));
  });

  it('test styles prop: typeContainer', function() {
    const typeContainerStyle = {
      flexGrow: '2',
      borderRight: '1px solid red',
      padding: '11px 13px'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      typeContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...typeContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-typeContainer]')
      .as('typeContainer')
      .then(() => Object.entries({ ...baseStyles.TYPE_CONTAINER_BASE_STYLE, ...typeContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.typeContainer[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', val)
      }));
  });

  it('test styles prop: typeSelected', function() {
    const typeSelectedStyle = {
      color: 'red',
      fontSize: '200%',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      typeSelected: (baseStyle: object) => ({
        ...baseStyle,
        ...typeSelectedStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-typeSelected]')
      .as('typeSelected')
      .then(() => Object.entries({ ...baseStyles.TYPE_SELECTED_BASE_STYLE, ...typeSelectedStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.typeSelected[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', val);
      }));
  });

  it('test styles prop: typeArrow', function() {
    const typeArrowStyle = {
      height: '80%',
      marginTop: '10px',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      typeArrow: (baseStyle: object) => ({
        ...baseStyle,
        ...typeArrowStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-typeArrow]')
      .as('typeArrow')
      .then(() => Object.entries({ ...baseStyles.TYPE_ARROW_BASE_STYLE, ...typeArrowStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.typeArrow[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', val);
      }));
  });

  it('test styles prop: typeOptionsContainer', function() {
    const typeOptionsContainerStyle = {
      border: '1px solid grey',
      borderRadius: '3px',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      typeOptionsContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...typeOptionsContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-typeContainer]')
      .first()
      .click()
      .get('[data-testid=mip-typeOptionsContainer]')
      .as('typeOptionsContainer')
      .then(() => Object.entries({ ...baseStyles.TYPE_OPTIONS_CONTAINER_BASE_STYLE({ height: 39, width: 225 }), ...typeOptionsContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        let expectedVal: any = val;
        if(key === 'top') expectedVal = '39px';
        else if(key === 'width') expectedVal = '225px';
        cy
          .wrap(this.typeOptionsContainer[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', expectedVal);
      }));
  });

  it('test styles prop: typeOption', function() {
    const typeOptionStyle = {
      height: '30px',
      border: '1px solid white',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      typeOption: (baseStyle: object) => ({
        ...baseStyle,
        ...typeOptionStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-typeContainer]')
      .first()
      .click()
      .get('[data-testid=mip-typeOption]')
      .as('typeOption')
      .then(() => Object.entries({ ...baseStyles.TYPE_OPTION_BASE_STYLE, ...typeOptionStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.typeOption[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .then(text => {
            if(key === 'fontFamily') expect(text).to.be.oneOf(['Arial serif', '"Arial serif"']);
            else expect(text).to.be.equal(val);
          })
      }));
  });

  it('test styles prop: colorSelectorContainer', function() {
    const colorSelectorContainerStyle = {
      border: '1px solid black',
      cursor: 'none',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      colorSelectorContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...colorSelectorContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-colorSelectorContainer]')
      .as('colorSelectorContainer')
      .then(() => Object.entries({ ...baseStyles.COLOR_SELECTOR_CONTAINER_BASE_STYLE, ...colorSelectorContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.colorSelectorContainer[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .then(text => {
            if(key === 'fontFamily') expect(text).to.be.oneOf(['Arial serif', '"Arial serif"']);
            else expect(text).to.be.equal(val);
          })
      }));
  });

  it('test styles prop: colorSelectedIndicator', function() {
    const colorSelectedIndicatorStyle = {
      height: '80%',
      marginLeft: '10px'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      colorSelectedIndicator: (baseStyle: object) => ({
        ...baseStyle,
        ...colorSelectedIndicatorStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-colorSelectedIndicator]')
      .as('colorSelectedIndicator')
      .then(() => Object.entries({ ...baseStyles.COLOR_SELECTED_INDICATOR_BASE_STYLE({ color: '#000000' }), ...colorSelectedIndicatorStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        let expectedVal = val;
        if(key === 'aspectRatio') expectedVal = '1 / 1';
        else if(key === 'backgroundColor') expectedVal = 'rgb(0, 0, 0)';
        cy
          .wrap(this.colorSelectedIndicator[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', expectedVal);
      }));
  });

  it('test styles prop: colorSelected', function() {
    const colorSelectedStyle = {
      fontSize: '15px',
      color: 'blue'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      colorSelected: (baseStyle: object) => ({
        ...baseStyle,
        ...colorSelectedStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-colorSelected]')
      .as('colorSelected')
      .then(() => Object.entries({ ...baseStyles.COLOR_SELECTED_BASE_STYLE, ...colorSelectedStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.colorSelected[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .then(text => {
            if(key === 'fontFamily') expect(text).to.be.oneOf(['Arial serif', '"Arial serif"']);
            else expect(text).to.be.equal(val);
          });
      }));
  });

  it('test styles prop: colorSelectorArrow', function() {
    const colorSelectorArrowStyle = {
      height: '80%',
      color: 'red'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      colorSelectorArrow: (baseStyle: object) => ({
        ...baseStyle,
        ...colorSelectorArrowStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-colorSelectorArrow]')
      .as('colorSelectorArrow')
      .then(() => Object.entries({ ...baseStyles.COLOR_SELECTOR_ARROW_BASE_STYLE, ...colorSelectorArrowStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.colorSelectorArrow[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .then(text => {
            if(key === 'fontFamily') expect(text).to.be.oneOf(['Arial serif', '"Arial serif"']);
            else expect(text).to.be.equal(val);
          });
      }));
  });

  it('test styles prop: palatteContainer', function() {
    const palatteContainerStyle = {
      height: '80%',
      color: 'red'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      palatteContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...palatteContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('[data-testid=mip-palatteContainer]')
      .as('palatteContainer')
      .then(() => Object.entries({ ...baseStyles.PALATTE_CONTAINER_BASE_STYLE({ colorContainerHeight: 39, colorContainerWidth: 255 }), ...palatteContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        let expectedVal = val;
        if(key === 'width') expectedVal = '225px';
        else if(key === 'top') expectedVal = '39px';
        cy
          .wrap(this.palatteContainer[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', expectedVal);
      }));
  });

  it('test styles prop: saturation', function() {
    const saturationStyle = {
      width: '80%',
      border: '1px solid red'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      saturation: (baseStyle: object) => ({
        ...baseStyle,
        ...saturationStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-saturation')
      .as('saturation')
      .then(() => Object.entries({ ...baseStyles.SATURATION_BASE_STYLE, ...saturationStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        let expectedVal = val;
        if(key === 'aspectRatio') expectedVal = '1 / 1';
        cy
          .wrap(this.saturation[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()].trim())
          .should('eq', expectedVal);
      }));
  });

  it('test styles prop: hue', function() {
    const hueStyle = {
      marginTop: '50px',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      hue: (baseStyle: object) => ({
        ...baseStyle,
        ...hueStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-hue')
      .as('hue')
      .then(() => Object.entries({ ...baseStyles.HUE_BASE_STYLE, ...hueStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.hue[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()]?.trim())
          .should('eq', val);
      }));
  });

  it('test styles prop: iconsContainer', function() {
    const iconsContainerStyle = {
      border: '1px solid black',
      width: '80%',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      iconsContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...iconsContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-iconsContainer]')
      .as('iconsContainer')
      .then(() => baseStyles.getIconsContainerRowColCounts({ current: this.iconsContainer[0] }, baseStyles.ICON_CONTAINER_BASE_STYLE))
      .then(({ rowCount, colCount }) => Object.entries({ ...baseStyles.ICONS_CONTAINER_BASE_STYLE(rowCount, colCount), ...iconsContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.iconsContainer[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()]?.trim())
          .should('eq', val);
      }));
  });

  it('test styles prop: iconContainer', function() {
    const iconContainerStyle = {
      border: '1px solid black',
      width: '80%',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      iconContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...iconContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-iconContainer]')
      .as('iconContainer')
      .then(() => Object.entries({ ...baseStyles.ICON_CONTAINER_BASE_STYLE, ...iconContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        for(let i = 0; i < this.iconContainer.length; ++i) {
          cy
            .wrap(this.iconContainer[i].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()]?.trim())
            .should('eq', val);
        }
      }));
  });

  it('test styles prop: icon', function() {
    const iconStyle = {
      opacity: '0.5',
      border: '1px solid red'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      icon: (baseStyle: object) => ({
        ...baseStyle,
        ...iconStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-icon]')
      .as('icon')
      .then(() => Object.entries({ ...baseStyles.ICON_BASE_STYLE({ hsva: { h: 0, s: 0, v: 0, a: 0 } }), ...iconStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        let expectedVal = val;
        if(key === 'color') expectedVal = 'rgb(0, 0, 0)';
        for(let i = 0; i < this.icon.length; ++i) {
          cy
            .wrap(this.icon[i].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()]?.trim())
            .should('eq', expectedVal);
        }
      }));
  });

  it('test styles prop: iconTip', function() {
    const iconTipStyle = {
      opacity: '0.5'
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      iconTip: (baseStyle: object) => ({
        ...baseStyle,
        ...iconTipStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-iconContainer]')
      .each((iconContainers, i) => {
        const iconTipStyles = Object.entries({ ...baseStyles.ICON_TIP_BASE_STYLE({}), ...iconTipStyle });
        cy
          .wrap(iconContainers[0])
          .trigger('mouseover')
          .get('[data-testid=mip-iconTip]')
          .then(iconTips => {
            iconTipStyles.forEach(([key, val]) => {
              if(key !== 'top' && key !== 'left') {
                cy
                  .wrap(iconTips[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()]?.trim())
                  .then(text => {
                    if(key === 'fontFamily') expect(text).to.be.oneOf(['Arial serif', '"Arial serif"']);
                    else expect(text).to.be.equal(val);
                  });
              }
            });
          })
          .wrap(iconContainers[0])
          .trigger('mouseout');
      });
  });
  
  it('test styles prop: loadingContainer', function() {
    const loadingContainerStyle = {
      opacity: '0.5',
      height: '30px',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      loadingContainer: (baseStyle: object) => ({
        ...baseStyle,
        ...loadingContainerStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-iconsContainer]')
      .then(elements => cy.get('[data-testid=mip-iconsContainer]').scrollTo(0, elements[0].scrollHeight))
      .get('[data-testid=mip-loadingContainer]')
      .as('loadingContainer')
      .then(() => Object.entries({ ...baseStyles.LOADING_CONTAINER_BASE_STYLE, ...loadingContainerStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.loadingContainer[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()]?.trim())
          .should('eq', val);
      }));
  });

  it('test styles prop: loading', function() {
    const loadingStyle = {
      height: '50px',
      border: '1px solid red',
      aspectRatio: '1 / 1',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      loading: (baseStyle: object) => ({
        ...baseStyle,
        ...loadingStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-iconsContainer]')
      .then(elements => cy.get('[data-testid=mip-iconsContainer]').scrollTo(0, elements[0].scrollHeight))
      .get('[data-testid=mip-loading]')
      .as('loading')
      .then(() => Object.entries({ ...baseStyles.LOADING_BASE_STYLE, ...loadingStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        cy
          .wrap(this.loading[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()]?.trim())
          .should('eq', val);
      }));
  });

  it('test styles prop: iconsContainerPlaceholder', function() {
    const iconsContainerPlaceholderStyle = {
      height: '50px',
      border: '1px solid red',
      aspectRatio: '1 / 1',
    };
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker styles={{
      iconsContainerPlaceholder: (baseStyle: object) => ({
        ...baseStyle,
        ...iconsContainerPlaceholderStyle
      })
    }}/></div>);
    cy
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('aiowejfoiawgivhjawiofawioe')
      .get('[data-testid=mip-searchIcon]')
      .first()
      .click()
      .get('[data-testid=mip-iconsContainerPlaceholder]')
      .as('iconsContainerPlaceholder')
      .then(() => Object.entries({ ...baseStyles.ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE, ...iconsContainerPlaceholderStyle }))
      .then(entries => entries.forEach(([key, val]) => {
        let expectedVal = val;
        if(key === 'fontFamily') expectedVal = '"Arial serif"';
        cy
          .wrap(this.iconsContainerPlaceholder[0].style[key.split(/(?=[A-Z])/).join('-').toLowerCase()]?.trim())
          .then(text => {
            if(key === 'fontFamily') expect(text).to.be.oneOf(['Arial serif', '"Arial serif"']);
            else expect(text).to.be.equal(val);
          })
      }));
  });
});

describe('test the onSearch prop', () => {
  it('onSearch should not be invoked when <MaterialIconPicker /> mounts', () => {
    const onSearch = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onSearch={onSearch}/></div>)
      .wrap(onSearch)
      .should('not.be.called');
  });

  it('onSearch should be invoked when there is a new input for mip-searchInput and mip-searchIcon is clicked', () => {
    const onSearch = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onSearch={onSearch}/></div>)
      .wrap(onSearch)
      .should('not.be.called')
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('book')
      .get('[data-testid=mip-searchIcon]')
      .first()
      .click()
      .then(() => expect(onSearch).to.be.calledOnceWithExactly('book'));
  });

  it('onSearch should be invoked when there is a new input for mip-searchInput and mip-searchIcon is clicked', () => {
    const onSearch = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onSearch={onSearch}/></div>)
      .wrap(onSearch)
      .should('not.be.called')
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('book')
      .get('[data-testid=mip-searchIcon]')
      .first()
      .click()
      .then(() => expect(onSearch).to.be.calledOnceWithExactly('book'));
  });

  it('onSearch should be invoked when there is a new input for mip-searchInput and enter is hit when mip-searchInput is focused', () => {
    const onSearch = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onSearch={onSearch}/></div>)
      .wrap(onSearch)
      .should('not.be.called')
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('book')
      .trigger('keydown', { key: 'Enter' })
      .then(() => expect(onSearch).to.be.calledOnceWithExactly('book'));
  });

  it('onSearch should not be invoked when there is a new input for mip-searchInput and enter is hit when mip-searchInput is not focused', () => {
    const onSearch = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onSearch={onSearch}/></div>)
      .wrap(onSearch)
      .should('not.be.called')
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('book')
      .get('body')
      .trigger('keydown', { key: 'Enter', force: true })
      .then(() => expect(onSearch).not.to.be.calledOnce);
  });
});

describe('test onSearchValueChange prop', () => {
  it('onSearchValueChange should not be invoked when <MaterialIconPicker /> mounts', () => {
    const onSearchValueChange = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onSearchValueChange={onSearchValueChange}/></div>)
      .wrap(onSearchValueChange)
      .should('not.be.called');
  });

  it('onSearchValueChange should be invoked when the value mip-searchInput changes', () => {
    const onSearchValueChange = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onSearchValueChange={onSearchValueChange}/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('book')
      .wrap(onSearchValueChange)
      .should('be.calledWith', 'b')
      .should('be.calledWith', 'bo')
      .should('be.calledWith', 'boo')
      .should('be.calledWith', 'book')
      .get('[data-testid=mip-searchInput]')
      .first()
      .clear()
      .then(() => expect(onSearchValueChange).to.be.calledWith(''));
  });
});

describe('test searchValue prop', () => {
  it('mip-searchInput has the value of searchValue', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker searchValue='book'/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .invoke('val')
      .should('eq', 'book');
  });

  it('mip-searchInput has the value of placeholder if searchValue is an empty string', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker searchValue=''/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .invoke('attr', 'placeholder')
      .should('eq', 'Search');
  });

  it('mip-searchInput can not change value if there is a searchValue', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker searchValue='book'/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('dummy')
      .invoke('val')
      .should('eq', 'book');
  });

  it('mip-searchInput can not change value if there is a searchValue(empty string)', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker searchValue=''/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('dummy')
      .invoke('val')
      .should('eq', '');
  });

  it('mip-searchInput can change value if there are both searchValue and onSearchValueChange', () => {
    const Container = () => {
      const [searchValue, setSearchValue] = useState('book');
      return <div style={WRAPPER_STYLES}><MaterialIconsPicker searchValue={searchValue} onSearchValueChange={newVal => setSearchValue(newVal)}/></div>;
    };
    cy
      .mount(<Container />)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('music')
      .invoke('val')
      .should('eq', 'bookmusic');
  });
});


describe('test defaultSearchValue prop', () => {
  it('mip-searchInput has the value of defaultSearchValue', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultSearchValue='book'/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .invoke('val')
      .should('eq', 'book');
  });

  it('mip-searchInput has the value of searchValue if both defaultSearchValue and searchValue exist', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultSearchValue='book' searchValue='music'/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .invoke('val')
      .should('eq', 'music');
  });

  it('mip-searchInput with a defaultSearchValue can change value', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultSearchValue='book'/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('newbook')
      .invoke('val')
      .should('eq', 'booknewbook');
  });

  it('mip-searchInput with both a defaultSearchValue and a searchValue can not change value', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultSearchValue='book' searchValue='music'/></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('newbook')
      .invoke('val')
      .should('eq', 'music');
  });

  it('mip-searchInput with both a defaultSearchValue and a searchValue as well as a onSearchValueChange can change value', () => {
    const Container = () => {
      const [searchValue, setSearchValue] = useState('book');
      return <div style={WRAPPER_STYLES}>
        <MaterialIconsPicker
          searchValue={searchValue}
          onSearchValueChange={newVal => setSearchValue(newVal)}
          defaultSearchValue={'music'}
        />
      </div>;
    };
    cy
      .mount(<Container />)
      .get('[data-testid=mip-searchInput]')
      .first()
      .invoke('val')
      .should('eq', 'book')
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('123')
      .invoke('val')
      .should('eq', 'book123');
  });
});

describe('test searchInputRef', () => {
  it('validate that searchInputRef is passed to mip-searchInput using onSearch', () => {
    const Container = () => {
      const searchInputRef = useRef(null);
      return <div style={WRAPPER_STYLES}><MaterialIconsPicker ref={{ searchInputRef }} onSearch={str => expect(searchInputRef.current.value).to.equal(str)}/></div>;
    };
    cy
      .mount(<Container />)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('book')
      .trigger('keydown', { key: 'Enter' })
  });

  it('validate that searchInputRef is passed to mip-searchInput using onSearchValueChange', () => {
    const Container = () => {
      const searchInputRef = useRef(null);
      return <div style={WRAPPER_STYLES}><MaterialIconsPicker ref={{ searchInputRef }} onSearchValueChange={str => expect(searchInputRef.current.value).to.equal(str)}/></div>;
    };
    cy
      .mount(<Container />)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('book')
      .trigger('keydown', { key: 'Enter' })
  });
});

describe('test onTypeChange', () => {
  it('onTypeChange should not be called when the component renders for the first time', () => {
    const onTypeChange = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onTypeChange={onTypeChange}/></div>)
      .get('[data-testid=mip-typeContainer]')
      .click()
      .then(() => expect(onTypeChange).not.to.be.calledOnce);
  });

  it('onTypeChange should be called with the selected when any of mip-typeOption is clicked', () => {
    const onTypeChange = cy.stub();
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onTypeChange={onTypeChange}/></div>);
    ICON_TYPES.forEach((_, i) => {
      cy
        .get('[data-testid=mip-typeContainer]')
        .click()
        .get('[data-testid=mip-typeOption]')
        .eq((i + 1) % ICON_TYPES.length)
        .click()
        .then(() => expect(onTypeChange).to.be.calledWith(ICON_TYPES[(i + 1) % ICON_TYPES.length]));
    });
  });

  it('onTypeChange should be called once when the same mip-typeOption is clicked more than once', () => {
    const onTypeChange = cy.stub();
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onTypeChange={onTypeChange}/></div>);
    for(let i = 0; i < 3; ++i) {
      cy
        .get('[data-testid=mip-typeContainer]')
        .click()
        .get('[data-testid=mip-typeOption]')
        .eq(1)
        .click()
        .then(() => expect(onTypeChange).to.be.calledOnce);
    }
  });
});

describe('test type', () => {
  it('mip-typeSelected should have the value of type.label', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker type={ICON_TYPES[1]}/></div>)
      .get('[data-testid=mip-typeSelected]')
      .first()
      .should('have.text', ICON_TYPES[1].label);
  });

  it('click on another mip-typeOption does not change the type if the type prop has a value', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker type={ICON_TYPES[1]}/></div>)
      .get('[data-testid=mip-typeContainer]')
      .click()
      .get('[data-testid=mip-typeOption]')
      .first()
      .click()
      .get('[data-testid=mip-typeSelected]')
      .first()
      .should('have.text', ICON_TYPES[1].label);
  });

  it('having type and onTypeChange at the same time allows changing the type', () => {
    const Container = () => {
      const [type, setType] = useState(ICON_TYPES[1]);
      return <div style={WRAPPER_STYLES}><MaterialIconsPicker type={type} onTypeChange={newType => setType(newType)}/></div>;
    };
    cy
      .mount(<Container />)
      .get('[data-testid=mip-typeContainer]')
      .click()
      .get('[data-testid=mip-typeOption]')
      .first()
      .click()
      .get('[data-testid=mip-typeSelected]')
      .first()
      .should('have.text', ICON_TYPES[0].label);
  });
});

describe('test defaultType', () => {
  it('mip-typeSelected should have the value of defaultType.label', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultType={ICON_TYPES[1]}/></div>)
      .get('[data-testid=mip-typeSelected]')
      .first()
      .should('have.text', ICON_TYPES[1].label);
  });

  it('mip-typeSelected should have the value of type.label if both defaultType and type exist', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultType={ICON_TYPES[1]} type={ICON_TYPES[2]}/></div>)
      .get('[data-testid=mip-typeSelected]')
      .first()
      .should('have.text', ICON_TYPES[2].label);
  });

  it('new type can be selected given only defaultType', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultType={ICON_TYPES[1]}/></div>)
      .get('[data-testid=mip-typeContainer]')
      .click()
      .get('[data-testid=mip-typeOption]')
      .first()
      .click()
      .get('[data-testid=mip-typeSelected]')
      .first()
      .should('have.text', ICON_TYPES[0].label);
  });

  it('new type can not be selected given both defaultType and type', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultType={ICON_TYPES[1]} type={ICON_TYPES[2]}/></div>)
      .get('[data-testid=mip-typeContainer]')
      .click()
      .get('[data-testid=mip-typeOption]')
      .first()
      .click()
      .get('[data-testid=mip-typeSelected]')
      .first()
      .should('have.text', ICON_TYPES[2].label);
  });

  it('new type can be selected given defaultType, type, and onTypeChange', () => {
    const Container = () => {
      const [type, setType] = useState(ICON_TYPES[1]);
      return <div style={WRAPPER_STYLES}><MaterialIconsPicker defaultType={ICON_TYPES[3]} type={type} onTypeChange={newType => setType(newType)}/></div>;
    };
    cy
      .mount(<Container />)
      .get('[data-testid=mip-typeContainer]')
      .click()
      .get('[data-testid=mip-typeOption]')
      .first()
      .click()
      .get('[data-testid=mip-typeSelected]')
      .first()
      .should('have.text', ICON_TYPES[0].label);
  });
});

describe('test onTypeOptionClick', () => {
  it('onTypeOptionClick is called when any mip-typeOption is clicked', () => {
    const onTypeOptionClick = cy.stub();
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onTypeOptionClick={onTypeOptionClick}/></div>);
    for(let i = 0; i < ICON_TYPES.length; ++i) {
      cy
        .get('[data-testid=mip-typeContainer]')
        .click()
        .get('[data-testid=mip-typeOption]')
        .eq(i)
        .click()
        .then(() => expect(onTypeOptionClick).to.be.calledWith(ICON_TYPES[i]));
    }
  });

  it('onTypeOptionClick is called when any mip-typeOption is clicked if the type prop is set', () => {
    const onTypeOptionClick = cy.stub();
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onTypeOptionClick={onTypeOptionClick} type={ICON_TYPES[0]}/></div>);
    for(let i = 0; i < ICON_TYPES.length; ++i) {
      cy
        .get('[data-testid=mip-typeContainer]')
        .click()
        .get('[data-testid=mip-typeOption]')
        .eq(i)
        .click()
        .then(() => expect(onTypeOptionClick).to.be.calledWith(ICON_TYPES[i]));
    }
  });
});

describe('test onHsvaChange', () => {
  it('onHsvaChange is called when saturation changes', () => {
    const onHsvaChange = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onHsvaChange={onHsvaChange}/></div>)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-saturation')
      .first()
      .click(10, 10)
      .then(() => expect(onHsvaChange).to.be.calledOnce);
  });

  it('onHsvaChange is called when hue changes', () => {
    const onHsvaChange = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onHsvaChange={onHsvaChange}/></div>)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-hue')
      .first()
      .click(0, 10)
      .then(() => expect(onHsvaChange).to.be.calledOnce);
  });
});

describe('test hsva prop', () => {
  it('mip-colorSelected has the value of hsva', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker hsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', hsvaToHex({ h: 240, s: 100, v: 100, a: 1 }));
  });

  it('all mip-icon have the value of hsva', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker hsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-icon]')
      .each($el => expect($el[0].style.color).to.be.equal(hexToRgb(hsvaToHex({ h: 240, s: 100, v: 100, a: 1 }))));
  });

  it('changing saturation does not work if the hsva prop has a value', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker hsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-saturation')
      .first()
      .click(10, 10)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', hsvaToHex({ h: 240, s: 100, v: 100, a: 1 }));
  });

  it('changing hue does not work if the hsva prop has a value', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker hsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-hue')
      .first()
      .click(0, 10)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', hsvaToHex({ h: 240, s: 100, v: 100, a: 1 }));
  });

  it('changing saturation works if both hsva and onHsvaChange exist', () => {
    const Container = () => {
      const [hsva, setHsva] = useState({ h: 240, s: 100, v: 100, a: 1 });
      return <div style={WRAPPER_STYLES}><MaterialIconsPicker hsva={hsva} onHsvaChange={newHsva => setHsva(newHsva)}/></div>;
    };
    cy
      .mount(<Container />)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-saturation')
      .first()
      .click(10, 10)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', '#e6e6f2');
  });

  it('changing hue works if both hsva and onHsvaChange exist', () => {
    const Container = () => {
      const [hsva, setHsva] = useState({ h: 240, s: 100, v: 100, a: 1 });
      return <div style={WRAPPER_STYLES}><MaterialIconsPicker hsva={hsva} onHsvaChange={newHsva => setHsva(newHsva)}/></div>;
    };
    cy
      .mount(<Container />)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-hue')
      .first()
      .click(0, 10)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', '#ff0000');
  });
});

describe('test defaultHsva', () => {
  it('mip-colorSelected has the value of defaultHsva', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultHsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', hsvaToHex({ h: 240, s: 100, v: 100, a: 1 }));
  });

  it('all mip-icon have the value of defaultHsva', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultHsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-icon]')
      .each($el => expect($el[0].style.color).to.be.equal(hexToRgb(hsvaToHex({ h: 240, s: 100, v: 100, a: 1 }))));
  });

  it('changing saturation works if the defaultHsva prop has a value', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultHsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-saturation')
      .first()
      .click(10, 10)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', '#e6e6f2');
  });

  it('changing hue works if the defaultHsva prop has a value', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker defaultHsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-hue')
      .first()
      .click(0, 10)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', '#ff0000');
  });

  it('changing saturation does not work if both defaultHsva and hsva have values', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker hsva={{ h: 240, s: 100, v: 100, a: 1 }} defaultHsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-saturation')
      .first()
      .click(10, 10)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', hsvaToHex({ h: 240, s: 100, v: 100, a: 1 }));
  });

  it('changing hue does not work if both defaultHsva and hsva have values', () => {
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker hsva={{ h: 240, s: 100, v: 100, a: 1 }} defaultHsva={{ h: 240, s: 100, v: 100, a: 1 }}/></div>)
      .get('[data-testid=mip-colorSelectorContainer]')
      .first()
      .click()
      .get('.w-color-hue')
      .first()
      .click(0, 10)
      .get('[data-testid=mip-colorSelected]')
      .first()
      .should('have.text', hsvaToHex({ h: 240, s: 100, v: 100, a: 1 }));
  });
});

describe('test the onIconsChange prop', () => {
  it('onIconsChange should not be invoked when the component first renders', () => {
    const onIconsChange = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onIconsChange={onIconsChange} /></div>)
      .wrap(onIconsChange)
      .should('not.be.called');
  });

  it('onIconsChange should be invoked with the new icons whenever mip-iconsContainer is scrolled to the bottom', () => {
    const onIconsChange = cy.stub();
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onIconsChange={onIconsChange} /></div>)
      .get('[data-testid=mip-iconsContainer]')
      .then(iconsContainers => {
        const { rowCount, colCount } = baseStyles.getIconsContainerRowColCounts({ current: iconsContainers[0] }, baseStyles.ICON_CONTAINER_BASE_STYLE);
        cy.get('[data-testid=mip-iconsContainer]').scrollTo('bottom', { duration: 500 });
        cy.wrap(onIconsChange).should('be.calledWith', MATERIAL_ICONS.slice(0, (rowCount + 1 + DEFAULT_ROW_ADDITION_NUMBER) * colCount));
        cy.get('[data-testid=mip-iconsContainer]').scrollTo('bottom', { duration: 500 });
        cy.wrap(onIconsChange).should('be.calledWith', MATERIAL_ICONS.slice(0, (rowCount + 1 + DEFAULT_ROW_ADDITION_NUMBER * 2) * colCount));
      });
  });

  it('onIconsChange should be invoked with the new icons given a searchValue whenever mip-iconsContainer is scrolled to the bottom', () => {
    const onIconsChange = cy.stub();
    const iconsPool = MATERIAL_ICONS.filter((s) => s.toLowerCase().includes('e'));
    cy
      .mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onIconsChange={onIconsChange} /></div>)
      .get('[data-testid=mip-searchInput]')
      .first()
      .type('e')
      .get('[data-testid=mip-searchIcon]')
      .click()
      .get('[data-testid=mip-iconsContainer]')
      .then(iconsContainers => {
        const { rowCount, colCount } = baseStyles.getIconsContainerRowColCounts({ current: iconsContainers[0] }, baseStyles.ICON_CONTAINER_BASE_STYLE);
        cy.wrap(onIconsChange).should('be.calledOnceWith', iconsPool.slice(0, (rowCount + 1) * colCount));
        cy.get('[data-testid=mip-iconsContainer]').scrollTo('bottom', { duration: 500 });
        cy.wrap(onIconsChange).should('be.calledWith', iconsPool.slice(0, (rowCount + 1 + DEFAULT_ROW_ADDITION_NUMBER) * colCount));
        cy.get('[data-testid=mip-iconsContainer]').scrollTo('bottom', { duration: 500 });
        cy.wrap(onIconsChange).should('be.calledWith', iconsPool.slice(0, (rowCount + 1 + DEFAULT_ROW_ADDITION_NUMBER) * colCount));
      });
  });
});

describe('test onIconClick prop', () => {
  it('onIconClick should be called with the name of the icon every time mip-iconContainer is clicked', () => {
    const onIconClick = cy.stub();
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onIconClick={onIconClick}/></div>);
    cy.get('[data-testid=mip-iconContainer]').eq(0).click();
    cy.wrap(onIconClick).should('be.calledOnceWith', MATERIAL_ICONS[0]);
    cy.get('[data-testid=mip-iconContainer]').eq(1).click();
    cy.wrap(onIconClick).should('be.calledWith', MATERIAL_ICONS[1]);
  });
});

describe('test onIconMouseEnter prop', () => {
  it('onIconMouseEnter should be called with the name of the icon whenever the mouse enters mip-iconContainer', () => {
    const onIconMouseEnter = cy.stub();
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker onIconMouseEnter={onIconMouseEnter}/></div>);
    cy.get('[data-testid=mip-iconContainer]').eq(0).trigger('mouseover').trigger('mouseout');
    cy.wrap(onIconMouseEnter).should('be.calledWith', MATERIAL_ICONS[0]);
    cy.get('[data-testid=mip-iconContainer]').eq(1).trigger('mouseover').trigger('mouseout');
    cy.wrap(onIconMouseEnter).should('be.calledWith', MATERIAL_ICONS[1]);
    cy.get('[data-testid=mip-iconContainer]').eq(2).trigger('mouseover').trigger('mouseout');
    cy.wrap(onIconMouseEnter).should('be.calledWith', MATERIAL_ICONS[2]);
  });
});

describe('test showIconTip prop', () => {
  it('if showIconTip is set to false, mip-iconTip should not be in the document if mip-iconContainer is hovered', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker showIconTip={false}/></div>);
    cy.get('[data-testid=mip-iconContainer]').eq(0).trigger('mouseover');
    cy.get('[data-testid=mip-iconTip]').should('not.exist');
  });

  it('if showIconTip is set to false, mip-iconTip should be in the document if mip-iconContainer is hovered', () => {
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker showIconTip={true}/></div>);
    cy.get('[data-testid=mip-iconContainer]').eq(0).trigger('mouseover');
    cy.get('[data-testid=mip-iconTip]').eq(0).should('be.visible');
  });
});

describe('test setIconTipText prop', () => {
  it('iconTipText should have the name text defined by setIconTipText', () => {
    const ADDED_TEXT = '_new';
    cy.mount(<div style={WRAPPER_STYLES}><MaterialIconsPicker setIconTipText={icon => icon + ADDED_TEXT}/></div>);
    cy
      .wrap(new Array(30))
      .each((_, i) => {
        cy.get('[data-testid=mip-iconContainer]').eq(i).trigger('mouseover');
        cy.get('[data-testid=mip-iconTip]').first().should('have.text', MATERIAL_ICONS[i] + ADDED_TEXT);
        cy.get('[data-testid=mip-iconContainer]').eq(i).trigger('mouseout');
      });
  });
});*/