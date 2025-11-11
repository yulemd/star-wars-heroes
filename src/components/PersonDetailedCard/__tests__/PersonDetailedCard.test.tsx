import type { FilmType } from '@/schemas/filmsSchema';
import type { PersonType } from '@/schemas/personSchema';
import { jest } from '@jest/globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { PersonDetailedCard } from '..';

// Mock dependencies
jest.mock('../PersonGraph', () => ({
  PersonGraph: () => <div data-testid="person-graph" />,
}));

jest.mock('../usePersonGraphNodes', () => ({
  usePersonGraphNodes: jest.fn(),
}));

import { usePersonGraphNodes } from '../usePersonGraphNodes';

describe('PersonDetailedCard', () => {
  const mockPerson: PersonType = {
    id: 1,
    name: 'Luke Skywalker',
    films: [1, 2],
    starships: [1],
  } as PersonType;

  const mockEpisodes: FilmType[] = [
    {
      id: 1,
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl: 'It is a period of civil war...',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      characters: [1, 2],
      planets: [1],
      starships: [1, 2],
      vehicles: [1],
      species: [1],
      created: '1977-05-25T00:00:00.000Z',
      edited: '1977-05-25T00:00:00.000Z',
      url: 'https://swapi.dev/api/films/1/',
    },
    {
      id: 2,
      title: 'The Empire Strikes Back',
      episode_id: 5,
      opening_crawl: 'It is a dark time for the Rebellion...',
      director: 'Irvin Kershner',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1980-05-17',
      characters: [1, 2],
      planets: [2],
      starships: [],
      vehicles: [],
      species: [],
      created: '1980-05-17T00:00:00.000Z',
      edited: '1980-05-17T00:00:00.000Z',
      url: 'https://swapi.dev/api/films/2/',
    },
  ];

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the graph with nodes and edges', async () => {
    (usePersonGraphNodes as jest.Mock).mockReturnValue({
      nodes: [{ id: 'node-1' }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    });

    await act(async () => {
      render(
        <PersonDetailedCard
          person={mockPerson}
          episodes={mockEpisodes}
          onClose={mockOnClose}
        />,
      );
    });

    const graph = await screen.findByTestId('person-graph');
    expect(graph).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    (usePersonGraphNodes as jest.Mock).mockReturnValue({
      nodes: [],
      edges: [],
    });

    render(
      <PersonDetailedCard
        person={mockPerson}
        episodes={mockEpisodes}
        onClose={mockOnClose}
      />,
    );

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders with motion container', () => {
    (usePersonGraphNodes as jest.Mock).mockReturnValue({
      nodes: [],
      edges: [],
    });

    const { container } = render(
      <PersonDetailedCard
        person={mockPerson}
        episodes={mockEpisodes}
        onClose={mockOnClose}
      />,
    );

    // Check if the motion.div is rendered by verifying the className
    expect(container.firstChild).toHaveClass('relative w-full h-[600px]');
  });
});
