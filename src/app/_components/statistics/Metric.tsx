import { ReactNode } from 'react';

type metricProps = {
    label: string,
    value: number,
    children: ReactNode
}

const Metric = (props: metricProps) => {
	return (
		<div className="w-screen px-10 py-6 sm:w-1/4">
			<div className="flex rounded-lg border-2 border-white bg-blue-300 pl-8 py-10">
				<div className="rounded-full bg-blue-500 p-2 text-white h-fit">
					{props.children}
				</div>
				<div className="pl-8">
					<div className="value text-4xl font-bold">{Math.round(props.value * 100) / 100}</div>
					<div className="label text-gray-600">{props.label}</div>
				</div>
			</div>
		</div>
	);
};

export default Metric;
