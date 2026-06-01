// services/flightState.js

const flightState = {
    departure: '',
    destination: '',
    date: '', // Could be an object for round trips { departure: '', return: '' }
    passengers: { adults: 1, children: 0, infants: 0 },
    filters: {}, // e.g., { stops: 'any', class: 'economy' }
    results: []
};

export const getFlightState = () => ({ ...flightState });

export const setFlightDeparture = (location) => {
    flightState.departure = location;
};

export const setFlightDestination = (location) => {
    flightState.destination = location;
};

export const setFlightDate = (date) => {
    flightState.date = date;
};

export const setFlightPassengers = (adults, children, infants) => {
    flightState.passengers = { adults, children, infants };
};

export const setFlightFilters = (filters) => {
    flightState.filters = { ...flightState.filters, ...filters };
};

export const setFlightResults = (results) => {
    flightState.results = results;
};

export const resetFlightState = () => {
    flightState.departure = '';
    flightState.destination = '';
    flightState.date = '';
    flightState.passengers = { adults: 1, children: 0, infants: 0 };
    flightState.filters = {};
    flightState.results = [];
};