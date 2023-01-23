export interface PropsType {
  label: string;
  value: string;
}

export const dataGender: PropsType[] = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Non-binary', value: 'non_binary'},
  {label: 'Trans', value: 'trans'},
  {
    label: 'My gender identity is not listed',
    value: 'my_gender_is_not_listed',
  },
  {
    label: 'Prefer not say',
    value: 'prefer_not_say',
  },
];

export const dataLocation: PropsType[] = [
  {label: 'Afganistan', value: 'afganistan'},
  {label: 'Argentina', value: 'argentina'},
  {label: 'Brazil', value: 'brazil'},
  {label: 'China', value: 'china'},
  {label: 'Denmark', value: 'denmark'},
  {label: 'Indonesia', value: 'indonesia'},
  {label: 'Singapore', value: 'singapore'},
];
