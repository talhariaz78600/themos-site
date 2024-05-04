import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { RiHandCoinLine } from 'react-icons/ri';
// import NcModal from '../../../../shared/NcModal/NcModal';
import ModalDialog from '../../../components/ModalDialog/ModalDialog';
import { dialogErrorMessage } from '@/components/constants/apiEndpoints';
// import { navigate } from 'gatsby';

interface PaymentsPageProps {
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  clientSecret: string;
}

const PaymentsPage: React.FC<PaymentsPageProps> = ({
  setShowSpinner,
  price,
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setShowSpinner(isLoading);
  }, [isLoading, setShowSpinner]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setSubmit(false);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_REST_DOMAIN_NAME}/pay-done`,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        // Handle other types of errors
      }
    } else {
      // Handle successful payment
    }

    setSubmit(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  function onReady(e: any) {
    setIsInit(true);
    setIsLoading(true);
    setShowSpinner(false);
  }

  return (
    <div>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="text-white space-y-8 pt-8 noFocus"
      >
        <PaymentElement id="payment-element" onReady={(e) => onReady(e)} />
        {isInit && (
          <div className="w-full flex flex-col items-center justify-between">
            <button
              disabled={!stripe || !elements}
              id="submit"
              type="submit"
              className="h-12 md:h-12 md:px-4 w-full rounded-lg bg-green-600 hover:bg-green-400 flex items-center justify-center text-neutral-50 focus:outline-none text-base font-semibold"
            >
              {submit ? (
                <span>Pay €{price} and book</span>
              ) : (
                <svg
                  role="status"
                  className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-400 fill-primary-6000"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </button>
            <div className="flex items-center justify-between shadow-xl dark:shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mt-10 mb-2 px-4 py-2 space-x-2 font-light text-sm text-white">
              <RiHandCoinLine size={18} />
              <span>Cancel 24 hours prior the service and get full refund.</span>
              {/*<a className="border-b border-white cursor-pointer">Details</a>*/}
            </div>
          </div>
        )}
        {message && <div id="payment-message">{message}</div>}
      </form>
      <ModalDialog
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={dialogErrorMessage.title}
        description={dialogErrorMessage.description}
        pareCloseModal={() => onModalClose()}
      />
    </div>
  );
};

export default PaymentsPage;

