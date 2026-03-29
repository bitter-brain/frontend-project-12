import * as Yup from 'yup'

const channelValidationSchema = (channels, t) => Yup.object().shape({
  channelName: Yup.string()
    .min(3, t('modals.validation.min'))
    .max(20, t('modals.validation.max'))
    .required(t('modals.validation.required'))
    .notOneOf(channels.map(c => c.name), t('modals.validation.channelExists')),
})

export default channelValidationSchema
