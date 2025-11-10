import { useApi } from '@/hooks';

export const PeopleList = () => {
  const { data, isLoading, error } = useApi('people');

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading people</p>;
  if (!data?.results.length) return <p>No results found.</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[68vw] mx-auto">
      {data.results.map(({ id, name, gender, height, mass, birth_year }) => (
        <li key={id} className="bg-gray-50 p-4 text-sm font-medium">
          <h2 className="font-semibold text-lg text-red-900">{name}</h2>
          <p className="text-sm text-gray-600">Gender: {gender}</p>
          <p className="text-sm text-gray-600">Height: {height} cm</p>
          <p className="text-sm text-gray-600">Mass: {mass} kg</p>
          <p className="text-sm text-gray-600">Born: {birth_year}</p>
        </li>
      ))}
    </ul>
  );
};
