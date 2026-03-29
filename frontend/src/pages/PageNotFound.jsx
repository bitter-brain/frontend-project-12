import { Link } from 'react-router-dom'
import notFoundImage from '../assets/not_found.svg'
import { useTranslation } from 'react-i18next'

const PageNotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img alt={t('notFound.title')} className="img-fluid h-25" src={notFoundImage} />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.text')}
        {' '}
        <Link to="/">{t('notFound.link')}</Link>
      </p>
    </div>
  )
}

export default PageNotFound
