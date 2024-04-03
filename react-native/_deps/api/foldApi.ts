import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from 'react-native/my-spin-squad/src/config'
import { selectFoldUserSessionId } from '_deps/redux/global-slices/sessions/sessionsSelectors'
import { Platform } from 'react-native'

const { baseApiUrl: baseUrl } = config

export const foldApi = createApi({
  reducerPath: 'foldApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json')

      headers.set(
        'User-Agent',
        `Fold/${config.version} ${Platform.OS}/${Platform.Version}`
      )

      if (!headers.has('X-CFC-SessionId')) {
        headers.set('X-CFC-SessionId', selectFoldUserSessionId(getState()))
      }

      return headers
    }
  }),
  endpoints: () => ({})
})
