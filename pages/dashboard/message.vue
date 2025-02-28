<template>
<main>
    <div class="flex h-screen bg-gray-100 -mt-6">
      <!-- Left sidebar -->
      <div class="w-1/3 border-r-[0.5px] bg-white">
        <div class="p-1.5 border-b-[0.5px]">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-semibold">Messages</h1>
            <div class="flex space-x-2">
              <button class="p-2 hover:bg-gray-100 rounded-full">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button class="p-2 hover:bg-gray-100 rounded-full">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Chat list -->
        <div class="overflow-y-auto h-[calc(100vh-73px)]">
          <div 
            v-for="chat in chats" 
            :key="chat.id"
            :class="[
              'flex items-center p-4 hover:bg-gray-50 cursor-pointer',
              selectedChat?.id === chat.id ? 'bg-gray-50' : ''
            ]"
            @click="selectChat(chat)"
          >
            <div class="relative">
              <img 
                :src="chat.avatar" 
                class="w-12 h-12 rounded-full"
                alt=""
              />
              <span 
                v-if="chat.online"
                class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-[0.5px] border-white rounded-full"
              ></span>
            </div>
            <div class="ml-4 flex-1">
              <div class="flex items-center justify-between">
                <h2 class="font-semibold">{{ chat.name }}</h2>
                <span class="text-sm text-gray-500">{{ chat.lastMessageTime }}</span>
              </div>
              <p class="text-sm text-gray-500 truncate">{{ chat.lastMessage }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Right chat area -->
      <div class="flex-1 bg-gray-25 flex flex-col">
        <div class="p-4 border-b-[0.5px] bg-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <h2 class="font-semibold">{{ selectedChat?.name }}</h2>
              <span 
                v-if="selectedChat?.online"
                class="ml-2 text-sm text-green-500"
              >
                Online
              </span>
            </div>
            <button class="p-2 hover:bg-gray-100 rounded-full">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <template v-if="selectedChat">
            <div 
              v-for="message in selectedChat.messages" 
              :key="message.id"
              :class="[
                'max-w-[70%] rounded-lg p-3',
                message.sender === 'user' 
                  ? 'ml-auto bg-gray-900 text-white' 
                  : 'bg-gray-100'
              ]"
            >
              <p>{{ message.text }}</p>
              <span class="text-xs mt-1 block" :class="[
                message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
              ]">
                {{ message.time }}
              </span>
            </div>
          </template>
        </div>
  
        <!-- Message input -->
        <div class="p-4 border-t-[0.5px] bg-white">
          <div class="flex items-center space-x-2">
            <input 
              v-model="newMessage"
              type="text"
              placeholder="Type a message..."
              class="flex-1 rounded-full border-[0.5px] border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-400"
              @keyup.enter="sendMessage"
            />
            <button 
              @click="sendMessage"
              class="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- -->
</main>
  </template>
  
  <script setup lang="ts">
  import avatar from '@/assets/img/user-avatar.svg'
  interface Message {
    id: number
    text: string
    sender: 'user' | 'other'
    time: string
  }
  
  interface Chat {
    id: number
    name: string
    avatar: string
    online: boolean
    lastMessage: string
    lastMessageTime: string
    messages: Message[]
  }
  
  const newMessage = ref('')
  const selectedChat = ref<Chat | null>(null)
  
  const chats = ref<Chat[]>([
    {
      id: 1,
      name: 'Mofoluwasho Adebayo',
      avatar: avatar,
      online: true,
      lastMessage: "I'm at the entrance of the scho..",
      lastMessageTime: 'now',
      messages: [
        {
          id: 1,
          text: 'Hello Olalekan',
          sender: 'other',
          time: 'Friday 2:20pm'
        },
        {
          id: 2,
          text: 'I hired you because I need urgent help with my makeup.',
          sender: 'other',
          time: 'Friday 2:20pm'
        }
      ]
    },
    {
      id: 2,
      name: 'Samson John',
      avatar: avatar,
      online: false,
      lastMessage: 'Are you there? Abeg time is going...',
      lastMessageTime: '10h',
      messages: []
    },
    // Add more chats as needed
  ])
  
  const selectChat = (chat: Chat) => {
    selectedChat.value = chat
  }
  
  const sendMessage = () => {
    if (!newMessage.value.trim() || !selectedChat.value) return
  
    const message: Message = {
      id: Date.now(),
      text: newMessage.value,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: 'numeric',
        hour12: true 
      })
    }
  
    selectedChat.value.messages.push(message)
    newMessage.value = ''
  }

  definePageMeta({
    layout: 'dashboard'
  })
  </script>