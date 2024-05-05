"use client"
import React, {FC} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import PayStatus from './PayStatus'
import {stripePromise} from "../../../components/constants/apiEndpoints";
import Footer from '@/components/Footer/Footer';

export interface PayPageProps {
  className?: string;
}

const PayPage: FC<PayPageProps> = ({ className = "" }) => {

  return (

      <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
        <main className="container my-4">
          <div className="max-w-4xl mx-auto">
            <Elements stripe={stripePromise}>
              <PayStatus/>
            </Elements>
          </div>
        </main>
            <Footer/>
      </div>
  );
};

export default PayPage;
