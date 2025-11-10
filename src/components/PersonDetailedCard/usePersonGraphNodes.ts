import { useStarships } from '@/queries';
import type { FilmType } from '@/schemas/filmsSchema';
import type { PersonType } from '@/schemas/personSchema';
import type { Edge, Node } from '@xyflow/react';
import { useMemo } from 'react';

export type FlowNode = Node<{ label: string }>;
export type FlowEdge = Edge;

export const usePersonGraphNodes = (
  person: PersonType,
  episodes: FilmType[],
) => {
  const starshipsInfo = useStarships(person);

  return useMemo(() => {
    if (!person) return { nodes: [] as FlowNode[], edges: [] as FlowEdge[] };

    const personNode: FlowNode = {
      id: `person-${person.id}`,
      type: 'default',
      position: { x: 0, y: 0 },
      data: { label: person.name },
      draggable: true,
      style: {
        background: '#0ff',
        color: '#000',
        border: '2px solid #0ff',
        padding: 8,
        borderRadius: 8,
        fontWeight: 'bold',
      },
    };

    const nodes: FlowNode[] = [personNode];
    const edges: FlowEdge[] = [];
    const usedShips = new Set<string>();

    let filmX = -200;
    const filmY = 150;
    const shipY = 300;

    episodes.forEach((film) => {
      const filmNode: FlowNode = {
        id: `film-${film.id}`,
        type: 'default',
        position: { x: filmX, y: filmY },
        data: { label: film.title },
        draggable: true,
        style: {
          background: '#0aa',
          border: '2px solid #0ff',
          color: '#fff',
          padding: 6,
          borderRadius: 8,
        },
      };
      nodes.push(filmNode);

      edges.push({
        id: `edge-person-${film.id}`,
        source: personNode.id,
        target: filmNode.id,
        animated: true,
        style: { stroke: '#0ff' },
      });

      const ships = starshipsInfo.data?.filter((ship) =>
        film.starships.includes(ship.id),
      );

      let shipX = filmX - (ships?.length ?? 0) * 60 + 30;
      ships?.forEach((ship, index) => {
        if (!usedShips.has(`${ship.id}`)) {
          const shipNode: FlowNode = {
            id: `ship-${ship.id}`,
            type: 'default',
            data: { label: ship.name },
            position: { x: shipX + index * 40, y: shipY + index * 40 },
            draggable: true,
            style: {
              background: '#044',
              color: '#0ff',
              border: '1px solid #0ff',
              padding: 6,
              borderRadius: 8,
              fontSize: 10,
            },
          };
          nodes.push(shipNode);
          usedShips.add(`${ship.id}`);
        }

        edges.push({
          id: `edge-${film.id}-${ship.id}`,
          source: filmNode.id,
          target: `ship-${ship.id}`,
          animated: true,
          style: { stroke: '#0ff' },
        });

        shipX += 100;
      });

      filmX += 200;
    });

    return { nodes, edges };
  }, [person, episodes, starshipsInfo.data]);
};
