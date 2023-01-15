import {$authHost} from "./index";

export const createRate = async (rate, device) => {
    const {data} = await $authHost.post('api/rate', {rate, device});
    return data;
};

export const fetchRateByDeviceId = async (deviceId) => {
    const {data} = await $authHost.get('api/rate', {params: {deviceId}})
    return data;
};