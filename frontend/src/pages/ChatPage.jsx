import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useGetChannelsQuery, channelsApi } from '../api/channelsApi'
import { useGetMessagesQuery } from '../api/messagesApi'
import { setActiveChannel } from '../slices/channelsSlice'
import { setMessages, addMessage } from '../slices/messagesSlice'
import ChannelsList from '../components/ChannelsList'
import MessagesPanel from '../components/MessagesPanel'
import AddChannelModal from '../components/AddChannelModal'
import socket from '../socket'
import DeleteChannelModal from '../components/RemoveChannelModal'
import RenameChannelModal from '../components/RenameChannelModal'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import SpinnerLoading from '../components/SpinnerLoading'
const ChatPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const activeChannelId = useSelector(state => state.channels.activeChannel)
  const messages = useSelector(state => state.messages)
  const { data: fetchedChannels, isLoading, error } = useGetChannelsQuery()
  const { data: fetchedMessages, isLoading: isLoadingMessages, error: errorMessages } = useGetMessagesQuery()

  useEffect(() => {
    if (fetchedChannels && !activeChannelId) {
      dispatch(setActiveChannel(fetchedChannels[0].id))
    }
  }, [fetchedChannels])

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

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          draft.push(payload)
        }),
      )
    })
    return () => socket.off('newChannel')
  }, [])

  useEffect(() => {
    socket.on('renameChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          const channel = draft.find(c => c.id === payload.id)
          if (channel) channel.name = payload.name
        }),
      )
    })
    return () => socket.off('renameChannel')
  }, [])

  useEffect(() => {
    socket.on('removeChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          return draft.filter(c => c.id !== payload.id)
        }),
      )
    })
    return () => socket.off('removeChannel')
  }, [])

  useEffect(() => {
    if (error || errorMessages) {
      toast.error(t('networkError'))
    }
  }, [error, errorMessages])

  if (isLoading || isLoadingMessages) return <SpinnerLoading />

  if (error || errorMessages) return null

  const activeChannel = fetchedChannels?.find(channel => channel.id === activeChannelId) ?? fetchedChannels?.[0]

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList
          channels={fetchedChannels}
          activeChannelId={activeChannelId}
          onChannelClick={id => dispatch(setActiveChannel(id))}
        />
        <MessagesPanel
          activeChannel={activeChannel}
          messages={messages}
          activeChannelId={activeChannelId}
        />
        <AddChannelModal />
        <DeleteChannelModal activeChannelId={activeChannelId} />
        <RenameChannelModal />
      </div>
    </div>
  )
}

export default ChatPage
