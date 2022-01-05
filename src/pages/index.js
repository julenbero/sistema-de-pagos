import Image from 'next/image';
import { getLayout } from '../layouts';
import { Button, Divider } from './../ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { useStripeClientSecret, useStripePromise } from '../lib/stripe';
import { PayForm } from '../ui/components';
import mercadopago from 'mercadopago';

export default function IndexPage({ checkoutUrl }) {
	const stripeClientSecret = useStripeClientSecret();

	const stripePromise = useStripePromise();

	return (
		<div className='flex'>
			<div className='flex mx-auto space-x-20'>
				<div className='flex flex-col w-[392px]'>
					<h2 className=' font-bold text-2xl mb-6'>Confirm and Pay</h2>
					<a href={checkoutUrl}>
						<Button className='bg-mercadopago flex justify-center items-center w-full'>
							Pay with{' '}
							<span className='ml-1'>
								<Image
									src='/img/mercadopago.png'
									height={40}
									width={98}
									alt='Pay with Mercado Pago'
								/>
							</span>
						</Button>
					</a>
					<div className='my-6 relative flex justify-center items-center'>
						<span className='text-center px-4 bg-white'>Or pay with card</span>
						<Divider className='z-[-1] absolute top-[13px]' />
					</div>
					{stripeClientSecret && (
						<Elements
							stripe={stripePromise}
							options={{
								clientSecret: stripeClientSecret,
								appearance: {
									theme: 'stripe',
								},
							}}>
							<PayForm />
						</Elements>
					)}
				</div>
				<div className='flex flex-col w-[491px]'>
					<Image
						src='/img/product.png'
						height={320}
						width={491}
						alt='Mi Producto'
					/>
					<div className='flex justify-between items-center my-6'>
						<span>Modern Studio with One Queen Bed</span>
						<span className='text-sm'> Miami Beach, Florida</span>
					</div>
					<Divider />
					<div className='flex flex-col mt-6'>
						<h5 className='font-bold mb-6'>Price Details</h5>
						<div className='flex flex-col space-y-5'>
							<div className='flex text-sm'>
								<span className='flex-1'>$42.00 x 2 night</span>
								<span>$84.00</span>
							</div>
							<div className='flex text-sm'>
								<span className='flex-1'>Cleaning fee</span>
								<span>$20.00</span>
							</div>
							<div className='flex text-sm'>
								<span className='flex-1'>Service fee</span>
								<span>$14.68</span>
							</div>
							<div className='flex text-sm'>
								<span className='flex-1'>Occupancy taxes and fees</span>
								<span>$13.52</span>
							</div>
							<div className='flex text-sm font-bold'>
								<span className='flex-1'>Total (USD)</span>
								<span>$132.20</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

IndexPage.getLayout = getLayout;

export async function getServerSideProps() {
	mercadopago.configure({
		access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
	});

	const { response } = await mercadopago.preferences.create({
		items: [
			{
				id: '00000001',
				currency_id: 'USD',
				title: 'Modern Studio with One Queen Bed',
				quantity: 1,
				unit_price: 132.2,
			},
		],
		external_reference: 'PB00001',
		binary_mode: true,
		back_urls: {
			failure: `${process.env.NEXT_PUBLIC_BASE_URL}/thanks/failure`,
			success: `${process.env.NEXT_PUBLIC_BASE_URL}/thanks/success`,
		},
	});

	const isProd = process.env.NODE_ENV === 'production';

	const checkoutUrl = isProd
		? response.init_point
		: response.sandbox_init_point;

	return {
		props: {
			checkoutUrl,
		},
	};
}
