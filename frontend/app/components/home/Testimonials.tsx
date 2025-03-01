import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TestimonialItem } from './TestimonialItem';

export const Testimonials = () => {
	const testimonials = [
		{
			name: 'John Doe',
			role: 'CEO',
			image: 'https://www.easygenerator.com/wp-content/uploads/2023/07/Cecile-e1680540825568-1-1.png',
			description:
				"If we wouldn't have started with Easygenerator, we wouldn't be able to produce as much content to train our customers and service providers as we are now.",
		},
		{
			name: 'Cecile',
			role: 'CEO',
			image: 'https://www.easygenerator.com/wp-content/uploads/2023/07/Cecile-e1680540825568-1-1.png',
			description:
				"If we wouldn't have started with Easygenerator, we wouldn't be able to produce as much content to train our customers and service providers as we are now.",
		},
		{
			name: 'Marcel',
			role: 'CEO',
			image: 'https://www.easygenerator.com/wp-content/uploads/2023/07/Cecile-e1680540825568-1-1.png',
			description:
				"If we wouldn't have started with Easygenerator, we wouldn't be able to produce as much content to train our customers and service providers as we are now.",
		},
	];

	const [activeTestimonial, setActiveTestimonial] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [testimonials]);

	return (
		<div className='mt-auto flex flex-col gap-y-4'>
			<div className='flex flex-col flex-nowrap overflow-hidden relative h-[240px]'>
				{testimonials.map((testimonial, index) => (
					<TestimonialItem
						key={index}
						testimonial={testimonial}
						isActive={activeTestimonial === index}
					/>
				))}
			</div>

			{/* bullets */}
			<div className='flex items-center justify-center gap-x-2'>
				{[0, 1, 2].map((index) => (
					<motion.button
						key={index}
						title={`Testimonial ${index + 1}`}
						className='size-2 bg-cgray-200 rounded-full'
						whileHover={{ scale: 1.5 }}
						whileTap={{ scale: 0.9 }}
						animate={{ opacity: activeTestimonial === index ? 1 : 0.5 }}
						onClick={(e) => {
							e.stopPropagation();
							setActiveTestimonial(index);
						}}
					/>
				))}
			</div>
		</div>
	);
};
