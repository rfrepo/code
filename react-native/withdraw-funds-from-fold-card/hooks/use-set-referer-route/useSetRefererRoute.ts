import { useAppDispatch } from 'src/redux/hooks'
import { useRoute } from '@react-navigation/native'
import { setRefererRoute } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSlice'

export const useSetRefererRoute = () => {
  const dispatch = useAppDispatch()

  const refererRoute = useRoute().name

  return {
    setRefererRoute: () => dispatch(setRefererRoute(refererRoute))
  }
}
