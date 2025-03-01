import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { motion } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { useMainStore } from '../../store/store';
import { api } from '../../lib/axios';
import { apiErrorHandler, setAuthToken } from '../../lib/axios';
import { useNavigate } from 'react-router';
import { useBelow1280 } from '../../hooks/useBelow1280';
import { useAuthValidations } from '../../hooks/useAuthValidations';
import { useLang } from '../../hooks/useLang';
interface AuthFormProps {
	isExpanded: boolean;
	activeMode: string;
	toggleMode: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const AuthForm = ({ isExpanded, activeMode, toggleMode }: AuthFormProps) => {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const [signupData, setSignupData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignupData((prev) => ({ ...prev, [name]: value }));
	};

	const setToast = useMainStore((state) => state.setToast);

	const [formErrors, setFormErrors] = useState<{
		email?: string;
		password?: string;
		name?: string;
	}>({
		email: '',
		password: '',
		name: '',
	});

	const { validateEmail, validatePassword, validateName } = useAuthValidations();

	const handleLoginSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const emailError = validateEmail(loginData.email);
		const passwordError = validatePassword(loginData.password);

		if (emailError || passwordError) {
			setFormErrors((prev) => ({ ...prev, email: emailError, password: passwordError }));
			return;
		}

		try {
			const r = await api.post('api/v1/auth/login', {
				email: loginData.email,
				password: loginData.password,
			});
			setAuthToken(r.data.accessToken);
			setLoginData({
				email: '',
				password: '',
			});
			setToast({
				html: <SuccessToast />,
				level: 'success',
			});
		} catch (error) {
			const err = apiErrorHandler(error);
			setToast({
				msg: err,
				level: 'error',
				timeout: 7000,
			});
		}
	};

	const handleSignupSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const nameError = validateName(signupData.name);
		const emailError = validateEmail(signupData.email);
		const passwordError = validatePassword(signupData.password);

		if (nameError || emailError || passwordError) {
			setFormErrors((prev) => ({ ...prev, name: nameError, email: emailError, password: passwordError }));
			return;
		}

		try {
			const r = await api.post('api/v1/auth/register', {
				name: signupData.name,
				email: signupData.email,
				password: signupData.password,
			});
			setAuthToken(r.data.accessToken);
			setSignupData({
				name: '',
				email: '',
				password: '',
			});

			setToast({
				html: <SuccessToast />,
				level: 'success',
			});
		} catch (error) {
			const err = apiErrorHandler(error);
			setToast({
				msg: err,
				level: 'error',
				timeout: 7000,
			});
		}
	};

	useEffect(() => {
		//reset form data and errors
		setLoginData({
			email: '',
			password: '',
		});
		setSignupData({
			name: '',
			email: '',
			password: '',
		});
		setFormErrors({
			email: '',
			password: '',
			name: '',
		});
	}, [activeMode]);

	const below1280 = useBelow1280();

	return (
		<motion.div
			className='flex-1 flex flex-col xl:flex-row h-full items-center z-10 justify-center gap-y-16 xl:gap-y-0'
			animate={{
				x: isExpanded && !below1280 ? 'calc(-1440px + 832px)' : 0,
				...(!below1280 && { justifyContent: isExpanded ? 'flex-start' : 'flex-end' }),
			}}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 30,
			}}
		>
			{below1280 && (
				<div className='flex justify-center items-center'>
					<h1 className='text-cgray-900 text-xl font-semibold'>
						<span className='text-[#F0754D]'>easy</span>generator
					</h1>
				</div>
			)}

			<div className='w-full max-w-[630px]'>
				{activeMode === 'login' ? (
					<LoginForm
						formData={loginData}
						onChange={handleLoginChange}
						onSubmit={handleLoginSubmit}
						toggleMode={toggleMode}
						errors={formErrors}
					/>
				) : (
					<SignupForm
						formData={signupData}
						onChange={handleSignupChange}
						onSubmit={handleSignupSubmit}
						toggleMode={toggleMode}
						errors={formErrors}
					/>
				)}
			</div>
		</motion.div>
	);
};

function SuccessToast() {
	const navigate = useNavigate();
	const { lang } = useLang();
	const [timer, setTimer] = useState(5);
	const interval = setInterval(() => {
		setTimer(timer - 1);
		if (timer <= 0) {
			clearInterval(interval);
		}
	}, 1000);

	useEffect(() => {
		if (timer <= 1) {
			navigate(`/${lang}`);
		}
	}, [timer]);

	return (
		<div>
			<p>
				Welcome to easygenerator, you'll be redirected to the dashboard in <span id='redirect-timer'>{timer}</span>{' '}
				seconds
			</p>
		</div>
	);
}
