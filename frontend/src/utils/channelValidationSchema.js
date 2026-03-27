import * as Yup from 'yup'

const channelValidationSchema = (channels) => Yup.object().shape({
  channelName: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательоне поле')
    .notOneOf(channels.map((c) => c.name), 'Канал уже существует')
})

export default channelValidationSchema