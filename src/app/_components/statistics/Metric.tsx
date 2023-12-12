import { ReactNode } from 'react';

type metricProps = {
	label: string;
	value: number;
	children: ReactNode;
};

const Metric = (props: metricProps) => {
	return (
		<div className="w-screen px-10 py-6 xl:w-1/4">
			<div className="flex rounded-lg border-2 border-white bg-blue-300 py-10 pl-8">
				<div className="h-fit rounded-full bg-blue-500 p-2 text-white">
					{props.children}
				</div>
				<div className="pl-8">
					<div className="value text-4xl font-bold">
						{Math.round(props.value * 100) / 100}
					</div>
					<div className="label text-gray-600">{props.label}</div>
				</div>
			</div>
		</div>
	);
};

export default Metric;
