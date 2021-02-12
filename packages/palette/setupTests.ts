import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import "regenerator-runtime/runtime"

Enzyme.configure({ adapter: new Adapter() })
