/*import { render, fireEvent, EventType } from '@testing-library/react';
import { MaterialIconsPicker } from '../components/MaterialIconsPicker';
import '@testing-library/jest-dom';

const DEFAULT_PROPS: object = {
    styles: {
        container: (baseStyle: object) => ({
            ...baseStyle,
            width: '400px',
            height: '700px',
        }),
    }
};

const WRAPPER_STYLES: object = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '700px',
};

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

beforeAll(() => {
    window.innerHeight = 900;
    window.innerWidth = 1440;
    window.ResizeObserver = ResizeObserver;
});

afterAll(() => {
    jest.clearAllMocks();
});

test('All elements are visible given default props', async () => {
    const { container, queryByTestId, queryAllByTestId } = await render(<MaterialIconsPicker {...DEFAULT_PROPS}/>);
    jest
        .spyOn(document.querySelector('[data-testid=mip-container]'), 'clientHeight', 'get')
        .mockImplementation(() => 400);
    // Object.defineProperty(container.querySelector('[data-testid=mip-container]').prototype, 'clientHeight', { configurable: true, value: 10 })
    await new Promise(r => setTimeout(r, 1000));
    await expect(queryByTestId('mip-container')).toBeVisible();
    await expect(queryByTestId('mip-optionContainer')).toBeVisible();
    await expect(queryByTestId('mip-searchContainer')).toBeVisible();
    await expect(queryByTestId('mip-searchIcon')).toBeVisible();
    await expect(queryByTestId('mip-searchInput')).toBeVisible();
    await expect(queryByTestId('mip-colorSelectorContainer')).toBeVisible();
    await expect(queryByTestId('mip-colorSelectedIndicator')).toBeVisible();
    await expect(queryByTestId('mip-colorSelected')).toBeVisible();
    await expect(queryByTestId('mip-colorSelectorArrow')).toBeVisible();
    await expect(container.querySelector('.w-color-saturation')).not.toBeInTheDocument();
    await expect(container.querySelector('.w-color-alpha-pointer')).not.toBeInTheDocument();
    await expect(queryAllByTestId('mip-iconContainer')).toHaveLength(2);
    await expect(queryAllByTestId('mip-icon')).toHaveLength(2);
    await expect(queryAllByTestId('mip-iconTip')).toHaveLength(2);
    await expect(queryByTestId('mip-iconsContainer')).toBeVisible();
});*/