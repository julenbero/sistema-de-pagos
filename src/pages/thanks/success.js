import Image from 'next/image';
import { getLayout } from '../../layouts';

import { Message } from '../../ui/components';
import { Button } from '../../ui/core';

export default function ThanksSuccessPage() {
	return (
		<Message
			title='Thank you'
			content='Your payment has been received successfully'
			action={<Button className='bg-[#D71567]'>Return to home</Button>}
			image={<Image src='/img/thanks.png' alt='' width={160} height={160} />}
		/>
	);
}

ThanksSuccessPage.getLayout = getLayout;
