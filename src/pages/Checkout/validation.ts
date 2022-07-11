import * as yup from 'yup';

const validation = yup.object().shape({
  name: yup.string().required('Укажите имя'),
  surname: yup.string().required('Укажите фамилию'),
  email: yup
    .string()
    .email('Введите действительный адрес электронной почты')
    .required('Электронная почта обязательна'),
  phone: yup
    .string()
    .required('Укажите телефон')
    .matches(/^(?:\+38)?(0\d{9})$/, 'Номер телефона недействителен'),
  city: yup.string().required('Укажите адрес'),
});

export default validation;
