


import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionForm = ({ token, onAddSubscription }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSubscription = async (subscriptionData, token) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/subscriptions`,
        subscriptionData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User ID not found. Please log in again.');
      setIsSubmitting(false);
      return;
    }

    const costValue = parseFloat(cost);
    if (isNaN(costValue) || costValue <= 0) {
      setError('Please enter a valid cost greater than 0');
      setIsSubmitting(false);
      return;
    }

    const selectedDate = new Date(renewalDate);
    if (isNaN(selectedDate.getTime())) {
      setError('Please select a valid renewal date');
      setIsSubmitting(false);
      return;
    }

    const subscriptionData = {
      userId,
      name,
      cost: costValue,
      renewalDate,
    };

    try {
      const response = await addSubscription(subscriptionData, token);
      if (response.data) {
        onAddSubscription();
        setName('');
        setCost('');
        setRenewalDate('');
      }
    } catch (err) {
      console.error('Error adding subscription', err);
      setError(err.response?.data?.message || 'Failed to add subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ transform: 'translateY(-10%)' }}>
      <form
        onSubmit={handleSubmit}
        className="relative max-w-lg w-full rounded-2xl border p-12"
      >
        <h1 className="text-4xl text-center mb-3">Add Subscription</h1>
        <p className="text-center text-lg mb-10 font-normal">Fill out to track your subscription.</p>

        {error && <div className="text-red-400 text-center mb-6 text-lg">{error}</div>}

        <div className="mb-8 font-normal text-lg">
          <label className="block mb-2" htmlFor="name">Subscription Name</label>
          <div className="border-b relative">
            <span className="absolute left-0 top-1 pl-2 text-2xl">
              <i className="fas fa-tag"></i>
            </span>
            <input
              id="name"
              type="text"
              placeholder="Netflix, Spotify..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pb-2 pt-0 placeholder-gray-500 focus:outline-none text-xl"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="mb-8 font-normal text-lg">
          <label className="block mb-2" htmlFor="cost">Cost</label>
          <div className="border-b relative">
            <span className="absolute left-0 top-1 pl-2 text-2xl">
              <i className="fas fa-dollar-sign"></i>
            </span>
            <input
              id="cost"
              type="number"
              placeholder="e.g. 9.99"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full pl-10 pb-2 pt-0 placeholder-gray-500 focus:outline-none text-xl"
              disabled={isSubmitting}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="mb-8 font-normal text-lg">
          <label className="block mb-2" htmlFor="renewalDate">Renewal Date</label>
          <div className="border-b relative">
            <span className="absolute left-0 top-1 pl-2 text-2xl">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              id="renewalDate"
              type="date"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
              className="w-full pl-10 pb-2 pt-0 placeholder-gray-500 focus:outline-none text-xl"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className={`bg-blue-500 rounded-full px-10 py-3 text-white font-medium text-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Subscription'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;

