import type { Route } from './+types/home';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { motion } from 'motion/react';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Easygenerator Auth' }, { name: 'description', content: 'Easygenerator Auth' }];
}

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeMode = searchParams.get('mode') || 'signup';
	const [isExpanded, setIsExpanded] = useState(false);

	// Form data states
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const [signupData, setSignupData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

	const toggleMode = () => {
		const newMode = activeMode === 'login' ? 'signup' : 'login';
		setSearchParams({ mode: newMode });
	};

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignupData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Login submitted:', loginData);
	};

	const handleSignupSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Signup submitted:', { ...signupData, skills: selectedSkills });
	};

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	useEffect(() => {
		const mode = searchParams.get('mode');
		if (mode !== 'login' && mode !== 'signup') {
			setSearchParams({ mode: 'signup' });
		}
	}, [searchParams, setSearchParams]);

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
		<div className='min-h-screen h-screen w-full flex overflow-hidden bg-white font-sans'>
			{/* Company Section */}
			<div className='max-w-8xl w-full mx-auto p-[14px] flex justify-start'>
				<motion.div
					className='bg-cpurple-700 rounded-[10px] hidden xl:block px-[64px] py-[54px] xl:w-[608px] h-full cursor-pointer'
					animate={{
						x: isExpanded ? 'calc(1440px - 608px - 28px)' : 0,
					}}
					transition={{
						type: 'spring',
						stiffness: 300,
						damping: 30,
					}}
					onClick={toggleExpand}
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
						<div className='mt-auto flex flex-col gap-y-4'>
							<div className='flex flex-col flex-nowrap overflow-hidden relative h-[240px]'>
								{testimonials.map((testimonial, index) => (
									<motion.div
										key={index}
										className='flex flex-col gap-y-4 bg-cpurple-800/60 p-6 rounded-xl absolute w-full'
										initial={{ opacity: 0, x: 80 }}
										animate={{
											x: activeTestimonial === index ? 0 : 80,
											opacity: activeTestimonial === index ? 1 : 0,
											display: activeTestimonial === index ? 'flex' : 'none',
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
								))}
							</div>

							{/* bullets */}
							<div className='flex items-center justify-center gap-x-2'>
								{[0, 1, 2].map((index) => (
									<motion.button
										key={index}
										title={`Testimonial ${index + 1}`}
										className='size-2 bg-cgray-100 rounded-full'
										whileHover={{ scale: 1.5 }}
										whileTap={{ scale: 0.9 }}
										animate={{ opacity: activeTestimonial === index ? 0.5 : 1 }}
										onClick={(e) => {
											e.stopPropagation();
											setActiveTestimonial(index);
										}}
									/>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
