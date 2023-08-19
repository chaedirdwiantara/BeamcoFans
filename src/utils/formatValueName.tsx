import {
  CitiesCountryResponseType,
  DataCountryType,
  DataStatePropsType,
} from '../interface/location.interface';

const formatValueName = (data: {name: string; id: number}[]) => {
  return data.map(item => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

const formatValueNameState = (
  data: DataStatePropsType[] | CitiesCountryResponseType[],
) => {
  return data.map(item => {
    return {
      ...item,
      label: item.name,
      value: item.name,
    };
  });
};

const formatValueNameCity = (data: string[]) => {
  return data.map(item => {
    return {
      label: item,
      value: item,
    };
  });
};

const formatValueNameCountry = (data: DataCountryType[]) => {
  return data.map(item => {
    return {
      label: item.name,
      value: item.countryCode,
      id: item.id,
    };
  });
};

export {
  formatValueName,
  formatValueNameState,
  formatValueNameCity,
  formatValueNameCountry,
};
