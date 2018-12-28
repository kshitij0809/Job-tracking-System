import fs from 'fs'

export const memberLog = (remoteAddress, headers) => {
  const log = `Date: ${Date()} | Request: ${headers.referer} | From: ${remoteAddress} | User-Agent: ${headers['user-agent']}\n`
  fs.appendFile('log.log', log)
}
