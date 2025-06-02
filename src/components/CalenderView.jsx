

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import axios from 'axios';
import { createEvents } from 'ics';

const CalendarView = ({ userId, token }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM YYYY'));

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/subscriptions/get/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!Array.isArray(data)) {
          throw new Error('Subscriptions data is not an array');
        }

        const calendarEvents = data.map((subscription) => {
          if (!subscription.renewalDate || !subscription.name || !subscription.cost) {
            return null;
          }

          const renewalDate = moment(subscription.renewalDate);
          if (!renewalDate.isValid()) {
            return null;
          }

          return {
            title: `${subscription.name} Renewal`,
            start: renewalDate.format('YYYY-MM-DD'),
            description: `Payment: ₹${subscription.cost}`,
            color: 'blue',
            extendedProps: {
              name: subscription.name,
              cost: subscription.cost,
              renewalDate: renewalDate.format('YYYY-MM-DD'),
            }
          };
        }).filter(event => event !== null);

        setEvents(calendarEvents);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError(err.response?.data?.message || 'Failed to fetch subscriptions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId, token]);

  const handleEventMouseEnter = (eventInfo) => {
    setHoveredEvent(eventInfo.event.extendedProps);
  };

  const handleEventMouseLeave = () => {
    setHoveredEvent(null);
  };

  const handleDateClick = (info) => {
    setCurrentMonth(moment(info.date).format('MMMM YYYY'));
  };

  // 📥 Handle Download as .ics file
  const handleDownloadICS = () => {
    if (!events.length) return alert('No events to download.');

    const formattedEvents = events.map(event => ({
      title: event.title,
      description: event.description,
      start: moment(event.start).format('YYYY-M-D').split('-').map(Number),
      duration: { hours: 0, minutes: 0 },
    }));

    createEvents(formattedEvents, (error, value) => {
      if (error) {
        console.error(error);
        return;
      }

      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'subscriptions.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className=" p-6  max-w-full sm:max-w-2xl mx-auto relative">
      <h2 className="text-2xl font-semibold mb-4 text-black">Subscription Renewal Calendar</h2>

      {loading && <p className="text-black">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

     

      <button
        onClick={handleDownloadICS}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
      >
        Download Calendar (.ics)
      </button>

      {hoveredEvent && (
        <div className="absolute top-20 right-10 bg-blue-500 text-white shadow-lg p-4 rounded-2xl border border-gray-300 z-10 max-w-md">
          <h3 className="font-semibold text-lg">{hoveredEvent.name}</h3>
          <p className="mt-2">Amount to Pay: ₹{hoveredEvent.cost}</p>
          <p className="mt-2">Renewal Date: {hoveredEvent.renewalDate}</p>
        </div>
      )}

      <div className="border-2 border-black p-4 rounded-md">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventColor="blue"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: '',
          }}
          views={{
            dayGridMonth: { buttonText: 'Month' },
            dayGridWeek: { buttonText: 'Week' },
            dayGridDay: { buttonText: 'Day' },
          }}
          height="auto"
          contentHeight="auto"
          dayHeaderFormat={{ weekday: 'long', month: 'short' }}
          eventTextColor="white"
          eventClassNames="bg-blue-500 text-white rounded-md p-1 shadow-md"
          dayCellClassNames="bg-white text-gray-800 hover:bg-gray-100"
          dayNumberClassNames="text-gray-800"
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
          datesSet={(dateInfo) => {
            setCurrentMonth(moment(dateInfo.view.currentStart).format('MMMM YYYY'));
          }}
          dateClick={handleDateClick}
        />
      </div>
    </div>
  );
};

export default CalendarView;


