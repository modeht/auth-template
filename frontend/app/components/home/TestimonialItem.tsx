import { motion } from 'motion/react';

interface TestimonialItemProps {
	testimonial: {
		name: string;
		role: string;
		image: string;
		description: string;
	};
	isActive: boolean;
}

export const TestimonialItem = ({ testimonial, isActive }: TestimonialItemProps) => {
	return (
		<motion.div
			className='flex flex-col gap-y-4 bg-cpurple-800/60 p-6 rounded-xl absolute w-full'
			initial={{ opacity: 0, x: 80 }}
			animate={{
				x: isActive ? 0 : 80,
				opacity: isActive ? 1 : 0,
				display: isActive ? 'flex' : 'none',
			}}
			transition={{ duration: 0.6 }}
		>
			<p className='text-cgray-100/80 text-lg font-normal'>{testimonial.description}</p>
			<div className='flex items-center gap-x-4'>
				<motion.img
					src={testimonial.image}
					alt={testimonial.name}
					className='size-12 rounded-xl'
					whileHover={{ scale: 1.1 }}
					transition={{ type: 'spring', stiffness: 400, damping: 10 }}
				/>

				<div>
					<p className='text-cgray-50 text-lg font-normal'>{testimonial.name}</p>
					<p className='text-cgray-100/80 text-sm font-normal'>{testimonial.role}</p>
				</div>
			</div>
		</motion.div>
	);
};
