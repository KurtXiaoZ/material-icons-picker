import { render, fireEvent, EventType, queryAllByTestId } from '@testing-library/react';
import { MaterialIconsPicker } from '../components/MaterialIconsPicker';
import '@testing-library/jest-dom';

const DEFAULT_PROPS = {

};

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
});

afterAll(() => {
    jest.clearAllMocks();
});

test('All elements are visible given default props', async () => {
    const { container, queryByTestId } = await render(<MaterialIconsPicker {...DEFAULT_PROPS}/>);
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
    await console.log(queryAllByTestId(container, 'mip-iconContainer'));
    await expect(queryAllByTestId(container, 'mip-iconContainer')).toHaveLength(2);
    await expect(queryAllByTestId(container, 'mip-icon')).toHaveLength(2);
    await expect(queryAllByTestId(container, 'mip-iconTip')).toHaveLength(2);
});