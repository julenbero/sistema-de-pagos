import clsx from 'clsx';

export function Button({ className, ...props }) {
	return (
		<button
			className={clsx(
				className,
				'rounded-md h-14 px-6 text-lg font-bold text-white'
			)}
			{...props}></button>
	);
}
