import { motion } from 'motion/react';
import { Testimonials } from './Testimonials';

interface CompanySectionProps {
	isExpanded: boolean;
}

export const CompanySection = ({ isExpanded }: CompanySectionProps) => {
	return (
		<motion.div
			className='bg-cpurple-700 rounded-[10px] hidden xl:block px-[64px] py-[54px] xl:w-[608px] h-full cursor-pointer z-30'
			animate={{
				x: isExpanded ? 'calc(1440px - 608px - 28px)' : 0,
			}}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 30,
			}}
		>
			<div className='flex flex-col h-full'>
				<div className='flex items-center gap-2'>
					<h1 className='text-white text-xl font-semibold'>
						<span className='text-[#F0754D]'>easy</span>generator
					</h1>
				</div>

				<div className='flex flex-col items-center gap-y-6 mt-[140px] text-cgray-25'>
					<h2 className='text-4xl font-medium'>AI-powered e-learning creation tool for enterprises</h2>
					<p className='text-cgray-200 text-lg font-normal'>
						Transform your documents into engaging e-learning or create company-tailored courses from scratch in
						minutes. Made for subject-matter experts and L&D alike.
					</p>
				</div>

				{/* Testimonials Section */}
				<Testimonials />
			</div>
		</motion.div>
	);
};
