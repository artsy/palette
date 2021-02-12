import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import Enzyme from "enzyme"

import "regenerator-runtime/runtime"

Enzyme.configure({ adapter: new Adapter() })
