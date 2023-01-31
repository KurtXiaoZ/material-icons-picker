import { render, fireEvent, EventType } from '@testing-library/react';
import { MaterialIconsPicker } from '../components/MaterialIconsPicker';

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

test('All elements are rendered correctly given default props', async () => {
    const { container } = await render(<MaterialIconsPicker {...DEFAULT_PROPS}/>);
});