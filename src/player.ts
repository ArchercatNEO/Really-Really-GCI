import { reactive } from 'vue'
import Decimal from 'break_infinity.js'

export default reactive({
    grass: new Decimal(0),
    position: [0, 0]
})
