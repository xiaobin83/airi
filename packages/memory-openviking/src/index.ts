import process from 'node:process'

import { Format, LogLevel, setGlobalFormat, setGlobalLogLevel } from '@guiiai/logg'
import { Client, ContextUpdateStrategy } from '@proj-airi/server-sdk'
import { runUntilSignal } from '@proj-airi/server-sdk/utils/node'

import { OpenVikingClient } from './client.js'

setGlobalFormat(Format.Pretty)
setGlobalLogLevel(LogLevel.Log)

function createEventId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function formatMemoriesForContext(
  memories: any[] | undefined,
  resources: any[] | undefined,
): string {
  const parts: string[] = []

  if (memories?.length) {
    parts.push('# Relevant memories:')
    for (const memory of memories) {
      const scoreText = memory.score ? ` (score: ${(memory.score * 100).toFixed(0)}%)` : ''
      const matchReason = memory.match_reason ? `\nReason: ${memory.match_reason}` : ''
      const content = memory.abstract || memory.overview || ''
      parts.push(`- ${content}${scoreText}${matchReason}`)
    }
  }

  if (resources?.length) {
    parts.push('\n# Relevant resources:')
    for (const resource of resources) {
      const scoreText = resource.score ? ` (score: ${(resource.score * 100).toFixed(0)}%)` : ''
      const content = resource.abstract || resource.overview || resource.uri || ''
      parts.push(`- ${content}${scoreText}`)
    }
  }

  return parts.join('\n') || ''
}

async function main() {
  const client = new Client({
    name: 'memory-openviking',
    possibleEvents: ['module:configure' as any],
  })

  const openVikingClient = new OpenVikingClient({
    baseUrl: process.env.OPENVIKING_BASE_URL || 'http://127.0.0.1:1933',
    apiKey: process.env.OPENVIKING_API_KEY,
    accountId: process.env.OPENVIKING_ACCOUNT_ID,
    userId: process.env.OPENVIKING_USER_ID,
    agentId: process.env.OPENVIKING_AGENT_ID,
  })

  client.onEvent('module:configure' as any, (event: any) => {
    console.log('Memory OpenViking module configured', event.data)
    openVikingClient
      .healthCheck()
      .then(() => {
        console.log('Successfully connected to OpenViking server')
      })
      .catch((error) => {
        console.error('Failed to connect to OpenViking server:', error)
      })
  })

  client.onEvent('input:text' as any, (event: any) => {
    const text = event.data.text
    console.log('Received input, searching OpenViking memories...')

    openVikingClient
      .find(text, { limit: 5 })
      .then((results) => {
        const contextText = formatMemoriesForContext(results.memories, results.resources)

        if (contextText) {
          console.log('Found relevant memories, sending context update')
          client.send({
            type: 'context:update' as any,
            data: {
              id: createEventId(),
              contextId: 'openviking-memories',
              strategy: ContextUpdateStrategy.ReplaceSelf,
              text: contextText,
              destinations: { all: true },
            },
          })
        }
      })
      .catch((error) => {
        console.error('Error processing input with OpenViking:', error)
      })
  })

  client.onEvent('input:text:voice' as any, (event: any) => {
    const text = event.data.transcription
    console.log('Received voice input, searching OpenViking memories...')

    openVikingClient
      .find(text, { limit: 5 })
      .then((results) => {
        const contextText = formatMemoriesForContext(results.memories, results.resources)

        if (contextText) {
          console.log('Found relevant memories, sending context update')
          client.send({
            type: 'context:update' as any,
            data: {
              id: createEventId(),
              contextId: 'openviking-memories',
              strategy: ContextUpdateStrategy.ReplaceSelf,
              text: contextText,
              destinations: { all: true },
            },
          })
        }
      })
      .catch((error) => {
        console.error('Error processing voice input with OpenViking:', error)
      })
  })

  runUntilSignal()

  process.on('SIGINT', () => client.close())
  process.on('SIGTERM', () => client.close())
}

main()
