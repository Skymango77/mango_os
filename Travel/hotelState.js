// services/hotelState.js

const hotelState = {
    location: '',
    checkInDate: '',
    checkOutDate: '',
    guests: { adults: 1, children: 0 },
    roomType: '',
    filters: {},
    results: []
};

export const getHotelState = () => ({ ...hotelState });

export const setHotelLocation = (location) => {
    hotelState.location = location;
    // Potentially trigger an event here if eventBus was already implemented
};

export const setHotelDates = (checkInDate, checkOutDate) => {
    hotelState.checkInDate = checkInDate;
    hotelState.checkOutDate = checkOutDate;
};

export const setHotelGuests = (adults, children) => {
    hotelState.guests = { adults, children };
};

export const setHotelRoomType = (roomType) => {
    hotelState.roomType = roomType;
};

export const setHotelFilters = (filters) => {
    hotelState.filters = { ...hotelState.filters, ...filters };
};

export const setHotelResults = (results) => {
    hotelState.results = results;
};

export const resetHotelState = () => {
    hotelState.location = '';
    hotelState.checkInDate = '';
    hotelState.checkOutDate = '';
    hotelState.guests = { adults: 1, children: 0 };
    hotelState.roomType = '';
    hotelState.filters = {};
    hotelState.results = [];
};