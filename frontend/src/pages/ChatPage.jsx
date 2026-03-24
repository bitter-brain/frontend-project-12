import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useGetChannelsQuery } from '../api/channelsApi'
import { useGetMessagesQuery } from '../api/messagesApi'
import { setActiveChannel } from '../slices/channelsSlice'
import { setMessages, addMessage } from '../slices/messagesSlice'
import ChannelsList from '../components/ChannelsList'
import MessagesPanel from '../components/MessagesPanel'
import socket from '../socket'

const ChatPage = () => {
  const dispatch = useDispatch()
  const activeChannelId = useSelector((state) => state.channels.activeChannel)
  const messages = useSelector((state) => state.messages)

  const { data: channels, isLoading, error } = useGetChannelsQuery()
  const { data: fetchedMessages, isLoading: isLoadingMessages, error: errorMessages } = useGetMessagesQuery()

  useEffect(() => {
    if (channels && !activeChannelId) {
      dispatch(setActiveChannel(channels[0].id))
    }
  }, [channels])

  useEffect(() => {
    if (fetchedMessages) {
      dispatch(setMessages(fetchedMessages))
    }
  }, [fetchedMessages])

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload))
    })
    return () => socket.off('newMessage')
  }, [])

  if (isLoading || isLoadingMessages) return <div>Загрузка...</div>
  if (error || errorMessages) return <div>Ошибка загрузки</div>

  const activeChannel = channels?.find((c) => c.id === activeChannelId) ?? channels?.[0]

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList
          channels={channels}
          activeChannelId={activeChannelId}
          onChannelClick={(id) => dispatch(setActiveChannel(id))}
        />
        <MessagesPanel
          activeChannel={activeChannel}
          messages={messages}
          activeChannelId={activeChannelId}
        />
      </div>
    </div>
  )
}

export default ChatPage