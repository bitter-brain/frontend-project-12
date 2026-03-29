import leoProfanity from '../profanity'

const Message = (props) => {
  const {
    body,
    username,
  } = props

  return (
    <>
      <div className="text-break mb-2">
        <b>{username}</b>
        {`: ${leoProfanity.clean(body)}`}
      </div>
    </>
  )
}

export default Message
