import {createAsyncThunk} from '@reduxjs/toolkit'
import {SquadActivityFeed, SquadActivityMeta} from '_deps/redux/slice/mySpinSquadSlice'

const getSpinSquadData = async () => {
    const response = await fetch('/api/spin-squad')
    return response.json()
}

type Response = SquadActivityMeta & { events: SquadActivityFeed[] }

export const retrieveMySpinSquadActivityFeed = createAsyncThunk(
    'retrieve/mySpinSquadActivityFeed',
    async (): Promise<Response> => getSpinSquadData()
)
