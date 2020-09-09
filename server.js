const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const randomLatitude = require('random-latitude')
const randomLongitude = require('random-longitude')

const app = express()
const server = http.Server(app)
const io = socketio(server)

const monsters = [
'Dreamseeker',
'Dawnmouth',
'Blazeteeth',
'Doommorph',
'The Ugly Mongrel',
'The Jade Army Jackal',
'The Supreme Night Bear',
'The Giant Sun Swine',
'Grimefoot',
'The Grotesque Abomination',
'The Slender Rot Lion',
'Helltree',
'The Lone Butcher Dragon',
'Horrortooth',
'Spiritmouth',
'The Wretched Pest',
'The White Eyes',
'The Dismal Guardian',
'The Raging Night Wolf',
'The Infamous Weirdo'
]

const dangerLevels = [
  'God',
  'Dragon',
  'Tiger',
  'Wolf'
]

setInterval(() => {
  const occurrenceData = {
    location: [
      {
        lat: randomLatitude({ fixed: 14 }),
        lng: randomLongitude({ fixed: 14 })
      }
    ],
    dangerLevel: dangerLevels[Math.floor(Math.random() * dangerLevels.length)],
    monsterName: monsters[Math.floor(Math.random() * monsters.length)]
  }

  io.emit('occurrence', occurrenceData)
}, 20000)  

app.use(express.json())
app.get('/', (_, response) => {
  return response.json({message: 'Hello, I am here!'})
})

server.listen(3333)