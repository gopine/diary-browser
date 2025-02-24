import clsx from 'clsx';

type SkeletonProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
};

const baseStyles = 'relative overflow-hidden bg-gray-50';

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1em',
  borderRadius = '4px',
  className,
}: SkeletonProps) => {
  return (
    <div
      className={clsx(baseStyles, className)}
      style={{ width, height, borderRadius }}
    >
      <div className="absolute top-0 left-0 w-[150%] h-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
    </div>
  );
};

export default Skeleton;
