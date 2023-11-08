import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../components/Input/TextInput';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import SelectInput from '../../components/Input/SelectInput';
import NumberInput from '../../components/Input/NumberInput';
import { TextareaInput } from '../../components/Input/TextareaInput';
import { Dish } from '../../api/dish/dishType';
import { District } from '../../api/district/districtType';
import { getDishList } from '../../api/dish';
import { getDistrictList } from '../../api/district';
import { getPaymentMethodList } from '../../api/payment';
import { PaymentMethod } from '../../api/payment/paymentMethodType';
import { postRestaurant, postRestaurantDIsh, postRestaurantPaymentMethod } from '../../api/restaurant';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enqueueSnackbar } from 'notistack';

const NewRestaurantPage = () => {
	const context = useContext(UserContext);
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm();
	const [dishes, setDishes] = useState<Dish[]>([]);
	const [districts, setDistricts] = useState<District[]>([]);
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

	useEffect(() => {
		const fetchDishList = async () => {
			if (context?.userInfo?.role !== 'ADMIN') return;
			const data = await getDishList();
			if (data) {
				setDishes(data);
			}
		};

		const fetchDistrictList = async () => {
			if (context?.userInfo?.role !== 'ADMIN') return;
			const data = await getDistrictList();
			setDistricts(data);
		};

		const fetchPaymentMethodList = async () => {
			if (context?.userInfo?.role !== 'ADMIN') return;
			const data = await getPaymentMethodList();
			setPaymentMethods(data);
		};

		fetchDishList();
		fetchDistrictList();
		fetchPaymentMethodList();
	}, [context?.userInfo?.role]);

	const newRestaurant = async (
		restaurant: {
			name: string;
			address: string;
			districtId: string;
			latitude: string;
			longitude: string;
			postalCode: string;
			phone: string;
			intro: string;
			openingHours: string;
		},
		startTime: string,
		endTime: string,
		dishId: string,
		paymentMethodId: string
	) => {
		restaurant.openingHours = JSON.stringify({
			monday: { from: startTime, to: endTime },
			tuesday: { from: startTime, to: endTime },
			wednesday: { from: startTime, to: endTime },
			thursday: { from: startTime, to: endTime },
			friday: { from: startTime, to: endTime },
			saturday: { from: startTime, to: endTime },
			sunday: { from: startTime, to: endTime },
		});
		// console.log(restaurant, dish, paymentMethod);
		const res = await postRestaurant(restaurant);
        if (res.restaurantId) {
            await postRestaurantDIsh({restaurantId: res.restaurantId, dishId})
            await postRestaurantPaymentMethod({restaurantId: res.restaurantId, paymentMethodId})
			enqueueSnackbar("Restaurant added successfully!", { variant: "success" });
			setTimeout(() => {
				navigate(`/restaurant/${res.restaurantId}`);
				navigate(0);
			}, 1000);
        }
		// const token = await postUserRegister(restaurant);
		// if (token.message) {
		// 	console.error(token.message);
		// } else {
		// 	sessionStorage.setItem('jwt', token.token || '');
		// 	navigate('/');
		// 	navigate(0);
		// }
	};

	return context?.userInfo?.role === 'ADMIN' ? (
		<form
			className='grid grid-cols-2 gap-3 px-6'
			onSubmit={handleSubmit((restaurant) =>
				newRestaurant(
					restaurant as {
						name: string;
						address: string;
						districtId: string;
						latitude: string;
						longitude: string;
						postalCode: string;
						phone: string;
						intro: string;
						openingHours: string;
					},
					restaurant.startTime,
					restaurant.endTime,
					restaurant.dishId,
					restaurant.paymentMethodId
				)
			)}
		>
			<p className='col-span-2 text-center text-3xl font-bold'>
				Create new restaurant
			</p>
			<div className='col-span-1 justify-center p-3'>
				<Controller
					name='name'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<TextInput
							label='Name'
							type='text'
							placeholder='Enter restaurant name'
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='address'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<TextInput
							label='Address'
							type='text'
							placeholder='Enter restaurant address'
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='districtId'
					control={control}
					defaultValue={''}
					render={({ field }) => (
						<SelectInput
							label='District'
							placeholder='Select district'
							value={field.value}
							onChange={field.onChange}
							optionList={districts.map((district) => {
								return { label: district.name, value: district.districtId };
							})}
						/>
					)}
				/>
				<Controller
					name='latitude'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<NumberInput
							label='Latitude'
							step='0.0001'
							placeholder='Enter restaurant latitude'
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='longitude'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<NumberInput
							label='Longitude'
							step='0.0001'
							placeholder='Enter restaurant longitude'
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='postalCode'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<TextInput
							label='Postal Code'
							type='text'
							placeholder='Enter restaurant postal code'
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className='col-span-1 justify-center p-3'>
				<Controller
					name='phone'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<TextInput
							label='Phone'
							type='text'
							placeholder='Enter restaurant phone'
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='intro'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<TextareaInput
							label='Introduction'
							placeholder='Enter restaurant introduction'
							value={field.value}
							onChange={field.onChange}
							className='border border-gray-400 p-2 mt-1   rounded-md'
						/>
					)}
				/>
				<div className='flex flex-col'>
					<label>Opening Hours</label>
					<div className='grid grid-cols-2'>
						<div>
							<Controller
								name='startTime'
								control={control}
								defaultValue={''}
								rules={{ required: true }}
								render={({ field }) => {
									return (
										// <TextareaInput
										// 	label='Opening Hours'
										// 	placeholder='Enter restaurant opening hours'
										// 	value={field.value}
										// 	onChange={field.onChange}
										// 	className='border border-gray-400 p-2 mt-1 rounded-md'
										// />
										<>
											<DatePicker
												placeholderText='Opening Hour'
												onChange={field.onChange}
												selected={field.value}
												showTimeSelect
												showTimeSelectOnly
												timeIntervals={15}
												timeCaption='Time'
												dateFormat='h:mm aa'
											/>
										</>
									);
								}}
							/>
						</div>
						<div>
							<Controller
								name='endTime'
								control={control}
								defaultValue={''}
								rules={{ required: true }}
								render={({ field }) => {
									return (
										// <TextareaInput
										// 	label='Opening Hours'
										// 	placeholder='Enter restaurant opening hours'
										// 	value={field.value}
										// 	onChange={field.onChange}
										// 	className='border border-gray-400 p-2 mt-1 rounded-md'
										// />
										<>
											<DatePicker
												placeholderText='Closing Hour'
												onChange={field.onChange}
												selected={field.value}
												showTimeSelect
												showTimeSelectOnly
												timeIntervals={15}
												timeCaption='Time'
												dateFormat='h:mm aa'
											/>
										</>
									);
								}}
							/>
						</div>
					</div>
				</div>
				<Controller
					name='dishId'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<SelectInput
							label='Dish'
							placeholder='Select dish'
							value={field.value}
							onChange={field.onChange}
							optionList={dishes.map((dish) => {
								return { label: dish.name, value: dish.dishId };
							})}
						/>
					)}
				/>
				<Controller
					name='paymentMethodId'
					control={control}
					defaultValue={''}
					rules={{ required: true }}
					render={({ field }) => (
						<SelectInput
							label='Payment Method'
							placeholder='Select payment method'
							value={field.value}
							onChange={field.onChange}
							optionList={paymentMethods.map((paymentMethod) => {
								return {
									label: paymentMethod.name,
									value: paymentMethod.paymentMethodId,
								};
							})}
						/>
					)}
				/>
			</div>
			<div className='flex flex-col items-center col-span-2'>
				<button
					type='submit'
					className='bg-[#000000] px-4 py-2 rounded-md text-[#ffffff] font-bold'
				>
					Add
				</button>
			</div>
		</form>
	) : (
		<div className='h-screen flex flex-col gap-6 justify-center max-w-3xl mx-auto'>
			{' '}
			<h1 className='text-3xl font-bold text-red-600 text-center'>
				You have no right to add new restaurant
			</h1>{' '}
		</div>
	);
};

export default NewRestaurantPage;
