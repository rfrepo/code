import { create, TwConfig } from 'twrnc'
import { ClassInput } from 'twrnc/dist/esm/types'
import localTailwindConfig from '_deps/lib/tailwind.config'
import { TailwindSelectors } from '_deps/@types/tailwind-selelctors'

const tw = create(<TwConfig>localTailwindConfig)

export const style = (...rest: TailwindSelectors[]) =>
  tw.style(...(rest as ClassInput[]))
export default tw
