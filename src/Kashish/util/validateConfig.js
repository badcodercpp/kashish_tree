import { CONFIG } from "../innerConfig";
const isArray = (array) => {
    if( typeof array[Symbol.iterator] === "function" ){
        return true;
    }
    return false;
}

export const isValidControl = (obj, target) => {
    if ( !(obj && obj[target] && isArray(obj[target])) ) {
        return false;
    }
    return true;
}

export const validateConfig = (config) => {
    if (!isValidControl(config[0], CONFIG.COUNTRY)) {
        return false;
    }
    const country = config[0].COUNTRY;
    for(const countryName of country){
        if (!isValidControl(countryName, CONFIG.STATE)) {
            return false;
        }
        const state = countryName.STATE;
        for (const stateName of state) {
            if (!isValidControl(stateName, CONFIG.DISTRICT)) {
                return false;
            }
            const district = stateName.DISTRICT;
            for (const districtName of district) {
                if (!isValidControl(districtName, CONFIG.ZIP)) {
                    return false;
                }
                const zip = districtName.ZIP;
                for (const zipName of zip) {
                    if (!zipName) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}