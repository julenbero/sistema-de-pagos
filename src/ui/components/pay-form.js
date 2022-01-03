import * as React from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { Button } from '../core/button';

export function PayForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = React.useState(null);

	const [isLoading, setIsLoading] = React.useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: 'http://localhost:3000/thanks/success',
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setErrorMessage(error.message);
		} else {
			setErrorMessage('An unexpected error ocurred');
		}
		setIsLoading(false);
	}
	return (
		<form className='flex flex-col' onSubmit={handleSubmit}>
			<PaymentElement />
			<Button className='bg-primary mt-6' disabled={isLoading}>
				<span>{isLoading ? 'Loading...' : 'Confirm and Pay'}</span>
			</Button>
			{errorMessage && <p>{errorMessage}</p>}
		</form>
	);
}
