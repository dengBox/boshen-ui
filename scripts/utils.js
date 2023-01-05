import { exec } from 'node:child_process'
import consola from 'consola'

export const shell = (cmd, opitons) => {
  return new Promise((resolve, reject) => {
    exec(cmd, opitons, (err, _stdout, _stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve('success')
      }
    })
  })
}

export const captureError = async (fn, message) => {
  try {
    await fn()
    consola.info(`${message} successful`)
  } catch (error) {
    consola.error(`${message} Error`, '\n', error)
    process.exit(0)
  }
}
