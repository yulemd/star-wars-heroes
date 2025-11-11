import { DefaultLoader } from './DefaultLoader';
import { InfiniteLoader } from './InfiniteLoader';

type LoaderVariant = 'default' | 'infinite';

interface LoaderProps {
  isLoading?: boolean;
  hasMore?: boolean;
  loadMoreRef?: React.RefObject<HTMLDivElement | null> | null;
  variant?: LoaderVariant;
  className?: string;
}

export const Loader = ({
  isLoading,
  hasMore,
  loadMoreRef,
  variant = 'default',
  className = '',
}: LoaderProps) =>
  variant === 'default' ? (
    <DefaultLoader />
  ) : (
    <div
      ref={loadMoreRef}
      className={`flex justify-center items-center mt-16 ${className}`}
    >
      {isLoading && (
        <div className="h-24 flex items-center">
          <InfiniteLoader />
        </div>
      )}

      {!isLoading && !hasMore && (
        <div className="h-24 flex items-center">
          <p className="text-gray-500 font-orbitron text-sm tracking-widest">
            END OF DATA STREAM
          </p>
        </div>
      )}
    </div>
  );
