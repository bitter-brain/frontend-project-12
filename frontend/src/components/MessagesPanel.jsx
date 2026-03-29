import Message from './Message'
import MessageForm from './MessageForm'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'

const MessagesPanel = ({ activeChannel, messages, activeChannelId }) => {
  const { t } = useTranslation()
  const channelMessages = messages?.filter(m => m.channelId === activeChannelId)

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              # {leoProfanity.clean(activeChannel?.name)}
            </b>
          </p>
          <span className="text-muted">{t('messages', { count: channelMessages?.length ?? 0 })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {channelMessages?.map(message => (
            <Message key={message.id} {...message} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm activeChannelId={activeChannelId} />
        </div>
      </div>
    </div>
  )
}

export default MessagesPanel
