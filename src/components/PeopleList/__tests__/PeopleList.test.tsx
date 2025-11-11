import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { PeopleList } from '../PeopleList';

// Mock dependencies
jest.mock('../usePeople', () => ({
  usePeople: jest.fn(),
}));

jest.mock('@/queries/useInfiniteApi', () => ({
  useInfiniteApi: jest.fn(),
}));

jest.mock('../../Loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

jest.mock('../../modal', () => ({
  PersonDetailedModal: () => <div data-testid="modal" />,
}));

jest.mock('../PeopleGrid', () => ({
  PeopleGrid: () => <div data-testid="people-grid" />,
}));

// Importing the mocked hooks
import { useInfiniteApi } from '@/queries/useInfiniteApi';
import { usePeople } from '../usePeople';

describe('PeopleList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (usePeople as jest.Mock).mockReturnValue({
      status: 'pending',
    });
    (useInfiniteApi as jest.Mock).mockReturnValue({ data: { pages: [] } });

    render(<PeopleList />);

    expect(screen.getByText(/ACCESSING HOLONET/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (usePeople as jest.Mock).mockReturnValue({
      status: 'error',
    });
    (useInfiniteApi as jest.Mock).mockReturnValue({ data: { pages: [] } });

    render(<PeopleList />);

    expect(screen.getByText(/ERROR: CONNECTION LOST/i)).toBeInTheDocument();
  });

  it('renders main content on success', () => {
    (usePeople as jest.Mock).mockReturnValue({
      status: 'success',
      items: [{ id: 1, name: 'Luke Skywalker' }],
      loadMoreRef: null,
      isFetchingNextPage: false,
      hasNextPage: false,
    });
    (useInfiniteApi as jest.Mock).mockReturnValue({
      data: { pages: [{ results: [] }] },
    });

    render(<PeopleList />);

    expect(screen.getByTestId('people-grid')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
