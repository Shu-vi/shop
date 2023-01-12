import {$authHost} from "./index";

export const fetchBasket = async (userId) => {
    const {data} = await $authHost.get('api/basket/' + userId);
    return data;
};

export const createBasket = async (userId, deviceId) => {
    const {data} = await $authHost.post('api/basket', {userId, deviceId});
    return data;
}

export const deleteBasket = async (basketDeviceId) => {
    const {data} = await $authHost.delete('api/basket/' + basketDeviceId);
    return data;
}