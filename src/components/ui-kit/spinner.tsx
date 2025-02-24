import type React from 'react';

interface SpinnerProps {
	size?: number;
	borderColor?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
	size = 40,
	borderColor = 'border-blue-500',
}) => {
	return (
		<div className="absolute w-full h-full inset-0 flex justify-center items-center backdrop-blur-xs z-20">
			<div
				className={`animate-spin rounded-full border-4 ${borderColor} border-t-transparent`}
				style={{ width: size, height: size }}
			/>
		</div>
	);
};

export default Spinner;
