import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY);

export default async function handlerCreatePaymentIntent(req, res) {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 1320,
		currency: 'USD',
		automatic_payment_methods: {
			enabled: true,
		},
	});
	res.json({ clientSecret: paymentIntent.client_secret });
}
