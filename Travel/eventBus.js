// core/eventBus.js

const subscribers = {};

export const subscribe = (eventType, callback) => {
    if (!subscribers[eventType]) {
        subscribers[eventType] = [];
    }
    subscribers[eventType].push(callback);
    // Return an unsubscribe function
    return () => {
        subscribers[eventType] = subscribers[eventType].filter(cb => cb !== callback);
    };
};

export const publish = (eventType, data) => {
    if (subscribers[eventType]) {
        subscribers[eventType].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in event subscriber for ${eventType}:`, error);
            }
        });
    }
};